export enum EMatchStatus {
  P,
  S,
  F,
  C
}

export interface IMatch {
  id: number
  title: string
  arena_id: number
  status: EMatchStatus
  first_team_id: number
  second_team_id: number
  event_date: string
  start_in: string
  duration: number
  winning_team_id: number
}
