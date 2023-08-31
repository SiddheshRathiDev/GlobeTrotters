namespace GlobeTrotters.HelperModels
{
    public class RegisterUserDto
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string? Name { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public string? Gender { get; set; }

        public string? Mobile { get; set; }

    }
}

