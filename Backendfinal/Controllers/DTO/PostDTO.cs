namespace TodoApi.Models.DTOs
{
    public class PostDTO
    {
        public int? UserId { get; set; } = null!;
        //public string PostUrl { get; set; }
        public IFormFile? ImageFile { get; set; } = null!;
        public string Caption { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string LocationName { get; set; }
    }
}
