using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class PostLike
{
    public int LikeId { get; set; }

    public int? PostId { get; set; }

    public int? UserId { get; set; }

    public DateTime? CreatedDatetime { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User? User { get; set; }
}
