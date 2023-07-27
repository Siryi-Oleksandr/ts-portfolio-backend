import Joi from "joi";

class JoiAPI {
  private categoryType = ["to-do", "in-progress", "done"];

  private emailRegexp: RegExp =
    /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;
  private linkedinRegexp: RegExp =
    /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/;
  private githubRegexp: RegExp =
    /^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?$/i;
  private telegramRegexp: RegExp =
    /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;
  private phoneRegexp: RegExp =
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  //* Class methods

  public registerSchema = Joi.object({
    name: Joi.string().min(2).max(35).required().messages({
      "any.required": "Missing required 'name' field",
      "string.min": "The length of 'name' must be between 2 and 35 characters",
      "string.max": "The length of 'name' must be between 2 and 35 characters",
    }),

    email: Joi.string()
      .pattern(new RegExp(this.emailRegexp))
      .required()
      .messages({ "any.required": "Email is required" }),

    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "The length of 'password' must be min 6 characters",
    }),
  });

  public loginSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp(this.emailRegexp))
      .required()
      .messages({ "any.required": "Email is required" }),

    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "The length of 'password' must be min 6 characters",
    }),
  });

  public refreshSchema = Joi.object({
    refreshToken: Joi.string()
      .required()
      .messages({ "any.required": "refreshToken is required" }),
  });

  public reviewsSchema = Joi.object({
    text: Joi.string().min(2).max(300).required().messages({
      "any.required": "Missing required 'text' field",
      "string.min": "The length of 'text' must be between 2 and 300 characters",
      "string.max": "The length of 'text' must be between 2 and 300 characters",
    }),

    rating: Joi.number().min(1).max(5).messages({
      "number.min": "Number of 'rating' must be between 1 and 5",
      "number.max": "Number of 'rating' must be between 1 and 5",
    }),
  });

  public updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(35).required().messages({
      "any.required": "Missing required 'name' field",
      "string.min": "The length of 'name' must be between 2 and 35 characters",
      "string.max": "The length of 'name' must be between 2 and 35 characters",
    }),

    surname: Joi.string().min(2).max(35).messages({
      "string.min":
        "The length of 'surname' must be between 2 and 35 characters",
      "string.max":
        "The length of 'surname' must be between 2 and 35 characters",
    }),

    email: Joi.string()
      .pattern(new RegExp(this.emailRegexp))
      .required()
      .messages({ "any.required": "Email is required" }),

    phone: Joi.string()
      .allow("")
      .pattern(new RegExp(this.phoneRegexp))
      .messages({
        "string.pattern.base":
          "The phone number format is incorrect. Please enter in the format '+XXXXXXXXXXXX'",
      }),

    telegram: Joi.string()
      .allow("")
      .pattern(new RegExp(this.telegramRegexp))
      .messages({
        "string.pattern.base":
          "The telegram link format is incorrect. Please enter in the format 'https://t.me/Alex_Doe'",
      }),

    profession: Joi.string().allow(""),

    experience: Joi.string().allow(""),

    summary: Joi.string().allow("").min(10).max(5000).messages({
      "string.min":
        "The length of 'summary' must be between 10 and 5000 characters",
      "string.max":
        "The length of 'summary' must be between 10 and 5000 characters",
    }),

    // technicalStack: Joi.array().items(Joi.string()),

    linkedinURL: Joi.string()
      .allow("")
      .pattern(new RegExp(this.linkedinRegexp))
      .messages({
        "string.pattern.base":
          "The Linkedin link format is incorrect. Please enter in the format 'https://www.linkedin.com/in/alex-doe/'",
      }),

    gitHubURL: Joi.string()
      .allow("")
      .pattern(new RegExp(this.githubRegexp))
      .messages({
        "string.pattern.base":
          "The GitHub link format is incorrect. Please enter in the format 'https://github.com/Alex-Doe'",
      }),
  });

  public taskCategorySchema = Joi.object({
    category: Joi.string()
      .valid(...this.categoryType)
      .required()
      .messages({ "any.required": "Missing required 'category' field" }),
  });

  public userPasswordSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.min": "The length of 'password' must be min 6 characters",
    }),

    newPassword: Joi.string().min(6).required().messages({
      "any.required": "New password is required",
      "string.min": "The length of 'new password' must be min 6 characters",
    }),
  });
}

const joiAPI = new JoiAPI();

export { joiAPI };
