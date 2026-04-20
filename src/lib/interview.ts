import fs from 'fs'
import path from 'path'
import type { Interview, InterviewItem, InterviewSection } from '@/types/interview'

const interviewDirectory = path.join(process.cwd(), 'content', 'interview')

const sectionTitleRe = /^\s*\d+[.．]\s*.+$/
const speakerRe = /^([^：]{1,20})：\s*(.*)$/
const boilerplateRe = /^(【.+】|株式会社STAR\s*UP\s*\|\s*広報|\d{4}年\d+月\d+日.*)$/

type Mode = 'intro' | 'toc' | 'body' | 'closing'

export function getAllInterviewIds(): string[] {
  if (!fs.existsSync(interviewDirectory)) return []
  return fs
    .readdirSync(interviewDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export function hasInterview(memberId: string): boolean {
  const fullPath = path.join(interviewDirectory, `${memberId}.md`)
  return fs.existsSync(fullPath)
}

export function getInterviewByMemberId(memberId: string): Interview | null {
  const fullPath = path.join(interviewDirectory, `${memberId}.md`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf8')
  return parseInterview(memberId, raw)
}

export function getInterviewPreview(memberId: string, maxLength = 90): string | null {
  const interview = getInterviewByMemberId(memberId)
  if (!interview) return null
  for (const section of interview.sections) {
    const answer = section.items.find(item => !/梅田/.test(item.speaker))
    if (answer && answer.text.trim()) {
      const flat = answer.text.replace(/\s+/g, '')
      return flat.length > maxLength ? `${flat.slice(0, maxLength)}…` : flat
    }
  }
  return null
}

function parseInterview(memberId: string, raw: string): Interview {
  const lines = raw.split('\n')
  const intro: string[] = []
  const sections: InterviewSection[] = []
  const closing: string[] = []

  let mode: Mode = 'intro'
  let currentSection: InterviewSection | null = null
  let currentItem: InterviewItem | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (mode === 'intro') {
      if (trimmed === '目次') {
        mode = 'toc'
        continue
      }
      if (trimmed && !boilerplateRe.test(trimmed)) intro.push(trimmed)
      continue
    }

    if (mode === 'toc') {
      if (!sectionTitleRe.test(trimmed)) continue
      let j = i + 1
      while (j < lines.length && !lines[j].trim()) j++
      if (j < lines.length && speakerRe.test(lines[j].trim())) {
        mode = 'body'
        currentSection = { title: trimmed, items: [] }
        sections.push(currentSection)
        currentItem = null
      }
      continue
    }

    if (mode === 'body') {
      if (trimmed === '最後に') {
        mode = 'closing'
        currentSection = null
        currentItem = null
        continue
      }
      if (sectionTitleRe.test(trimmed)) {
        currentSection = { title: trimmed, items: [] }
        sections.push(currentSection)
        currentItem = null
        continue
      }
      const m = trimmed.match(speakerRe)
      if (m) {
        currentItem = { speaker: m[1].trim(), text: m[2] }
        currentSection?.items.push(currentItem)
        continue
      }
      if (trimmed && currentItem) {
        currentItem.text += '\n' + trimmed
      }
      continue
    }

    if (mode === 'closing') {
      if (trimmed) closing.push(trimmed)
    }
  }

  return { memberId, intro, sections, closing }
}
