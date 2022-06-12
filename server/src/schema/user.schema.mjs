import * as yup from 'yup';

export const createUserSchema  = yup.object().shape({

	body:yup.object().shape({
		name : yup.string()
		.required("Name is required"),
		password:yup.string()
		.required()
		.min(6,"Password is too short - sh ould be 6 characters mininmum")
		.matches(/^[a-zA-Z0-9_.-]+$/, "Password can only contain latin letters"),
		passwordConfirmation:yup.string().oneOf(
			[yup.ref("password"), null],
			"Password must match"
		),
		email: yup.string()
		.email("Must be a valid email")
		.required("Email is required")
	})
	
});

export const createUserSessionSchema= yup.object().shape({
	
	body:yup.object().shape({
		password: yup.string()
		.required("Password is required")
		.min(6,"Password is too short - should be 6 characters mininmum")
		.matches(/^[a-zA-Z0-9_.-]+$/, "Password can only contain latin letters"),
	
		email: yup.string()
		.email("Must be a valid email")
		.required("Email is required")
	})

})