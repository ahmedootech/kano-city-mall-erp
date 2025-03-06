export type Department={
    id: number;
    uuid: string;
    name: string;
    description: string;
    max_employee_no: number;
    created_at: Date;
    updated_at: Date;
    status: number;
    hod: string | number
}