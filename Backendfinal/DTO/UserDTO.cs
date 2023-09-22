namespace WebApplicationMySql.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string? Name { get; set; }

        public DateOnly? Dob { get; set; }

        public string? Gender { get; set; }

        public string? Mobile { get; set; }

        public string? ProfilePhoto { get; set; }
    }
}
