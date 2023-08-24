namespace WebApplicationMySql.DTO
{
    public class PostCommentDTO
    {
        public int? PostId { get; set; }

        public int? UserId { get; set; }

        public DateTime? CreatedDatetime { get; set; }
    }
}
