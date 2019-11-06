export interface FormAnswerResponse {
    eventObj: ObjectWithId;
    formAnswer: ObjectWithId;
}

interface ObjectWithId {
    id: number;
}