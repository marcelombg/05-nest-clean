import { UseCaseError } from "@/core/errors/use-case-error";

export class StudentAlreadyExistsError extends Error implements UseCaseError {
    constructor(email: string) {
        super("Student with same e-mail address already exists.");
    }
}