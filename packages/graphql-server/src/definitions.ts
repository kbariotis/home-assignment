
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SubmissionState {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export enum OrderDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SubmissionOrderBy {
    PROVIDER_NAME = "PROVIDER_NAME",
    GRANT_TITLE = "GRANT_TITLE"
}

export interface GrantFilterInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    submitted?: Nullable<boolean>;
}

export interface SubmissionOrderInput {
    field?: Nullable<SubmissionOrderBy>;
    direction?: Nullable<OrderDirection>;
}

export interface SubmitGrantFeedbackInput {
    grantId: string;
    state: SubmissionState;
    feedback?: Nullable<string>;
}

export interface ApplicationError {
    message: string;
}

export interface GrantSubmission {
    id: string;
    grantId: string;
    state: SubmissionState;
    feedback?: Nullable<string>;
    createdAt: string;
    grant: Grant;
}

export interface Grant {
    id: string;
    providerName: string;
    grantTitle: string;
    deadline?: Nullable<string>;
    applyUrl: string;
    location: string;
    areas: string[];
    amount?: Nullable<string>;
    sourcedDate: string;
    submission?: Nullable<GrantSubmission>;
}

export interface IQuery {
    grants(input?: Nullable<GrantFilterInput>): Grant[] | Promise<Grant[]>;
    submissions(orderBy?: Nullable<SubmissionOrderInput>): GrantSubmission[] | Promise<GrantSubmission[]>;
}

export interface IMutation {
    submitGrantFeedback(input: SubmitGrantFeedbackInput): SubmitFeedbackResult | Promise<SubmitFeedbackResult>;
}

export type SubmitFeedbackResult = GrantSubmission | ApplicationError;
type Nullable<T> = T | null;
