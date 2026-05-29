export interface InterviewItem {
  speaker: string
  text: string
}

export interface InterviewSection {
  title: string
  items: InterviewItem[]
}

export interface Interview {
  memberId: string
  intro: string[]
  sections: InterviewSection[]
  closing: string[]
}
