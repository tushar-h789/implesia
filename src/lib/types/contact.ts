/**
 * Contact form data types
 * These types ensure type safety across the contact form implementation
 */

export interface ContactFormData {
	name: string;
	phone: string;
	email: string;
	companyName: string;
	dueDate: string;
	message: string;
	acceptedTerms: boolean;
}

export interface ContactFormErrors {
	name?: string;
	phone?: string;
	email?: string;
	companyName?: string;
	dueDate?: string;
	message?: string;
	acceptedTerms?: string;
}

export interface ContactFormResponse {
	success: boolean;
	message: string;
	errors?: ContactFormErrors;
}

