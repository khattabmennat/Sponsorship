export interface Sponsor {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    telephoneNumber: string;
    email: string;
    helpType: string;
    contributionAmount: number;
    erstellDatum: string;
    helpstartdate: string | null;
    paid: boolean;
    nrOfFamilyHelped: number;
    nameOfFamilyAssisted: string;
    personalIdCard: string;
}