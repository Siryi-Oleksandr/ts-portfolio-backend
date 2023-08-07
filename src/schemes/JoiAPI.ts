import Joi from "joi";

class JoiAPI {
  // private categoryType = ["to-do", "in-progress", "done"];

  private emailRegexp: RegExp =
    /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;
  private linkedinRegexp: RegExp =
    /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/;
  private githubRegexp: RegExp =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z\d-]+$/i;
  private telegramRegexp: RegExp =
    /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/;
  private phoneRegexp: RegExp =
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  private imageSchema = Joi.object({
    posterURL: Joi.string().uri().required(),
    posterID: Joi.string().required(),
  });

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

  public updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(35).required().messages({
      "any.required": "Missing required 'name' field",
      "string.min": "The length of 'name' must be between 2 and 35 characters",
      "string.max": "The length of 'name' must be between 2 and 35 characters",
    }),

    surname: Joi.string().allow(""),

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

    technicalStack: Joi.string().allow(""),

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

  public projectSchema = Joi.object({
    projectTitle: Joi.string().min(3).max(100).required().messages({
      "any.required": "Missing required 'title' field",
      "string.min":
        "The length of 'title' must be between 3 and 100 characters",
      "string.max":
        "The length of 'title' must be between 3 and 100 characters",
    }),

    projectSubTitle: Joi.string().allow(""),

    projectLink: Joi.string().allow(""),

    codeLink: Joi.string().allow(""),

    aboutProject: Joi.string().required().messages({
      "any.required": "Missing required 'description project' field",
    }),

    technicalStack: Joi.string().required().messages({
      "any.required": "Add at least one technical to the project",
    }),

    projectImages: Joi.array().items(this.imageSchema),
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
