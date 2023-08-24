using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Post
{
    public int PostId { get; set; }

    public int? UserId { get; set; }

    public string? PostUrl { get; set; }

    public DateTime? CreatedDatetime { get; set; }

    public string? Caption { get; set; }

    public int? LikesCount { get; set; }

    public int? CommentsCount { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();

    public virtual ICollection<PostLike> PostLikes { get; set; } = new List<PostLike>();

    public virtual User? User { get; set; }
}
