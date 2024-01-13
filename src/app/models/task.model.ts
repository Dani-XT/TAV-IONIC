export interface Task {
    _id: string,
    title: string,
    description: string,
    completed: boolean,
    state: string,
    activities: Activities[],
    owner: string,
    tenant_id: string
}

export interface Activities { 
    name: string,
    finished: boolean,
}