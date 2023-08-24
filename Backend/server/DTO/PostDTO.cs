namespace WebApplicationMySql.DTO
{
    public class PostDTO
    {
        public int PostId { get; set; }

        public int? UserId { get; set; }

        public string? PhotoUrl { get; set; }

        public DateTime? CreatedDatetime { get; set; }

        public string? Caption { get; set; }

        public int? LikesCount { get; set; }

        public int? CommentsCount { get; set; }
    }
}
