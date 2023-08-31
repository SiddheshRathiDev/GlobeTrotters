namespace GlobeTrotters.DTO
{
    public class SingleCommentDTO
    {
        string? comment_content;
        string? userName;

        public SingleCommentDTO() { }

        public SingleCommentDTO(string? comment_content, string? userName)
        {
            this.comment_content = comment_content;
            this.userName = userName;
        }
    }
}
