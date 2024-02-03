namespace GlobeTrotters.DtoModels
{
    public class UpdateUserDto
    {
        public int UId { get; set; }
        public string? Name { get; set; }

        public DateOnly? Dob { get; set; }

        public string? Gender { get; set; }

        public string? Mobile { get; set; }
    }
}

