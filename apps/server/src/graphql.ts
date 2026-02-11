/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
}

export interface IQuery {
    grants(skip?: Nullable<number>, take?: Nullable<number>): Grant[] | Promise<Grant[]>;
}

type Nullable<T> = T | null;
