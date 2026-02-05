def validate_password(password):
    if len(password) < 8:
        return "Password too short"
    if password.islower() or password.isupper():
        return "Use both upper & lowercase letters"
    if not any(char.isdigit() for char in password):
        return "Add at least one number"
    if not any(char in "!@#$%^&*" for char in password):
        return "Add a special character"
    return None  # means valid