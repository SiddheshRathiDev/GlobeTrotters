using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class User
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

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public string? Extra3 { get; set; }

    public string? Extra4 { get; set; }

    public virtual ICollection<Admin> Admins { get; set; } = new List<Admin>();

    public virtual ICollection<Community> Communities { get; set; } = new List<Community>();

    public virtual ICollection<Connection> ConnectionFollowedByNavigations { get; set; } = new List<Connection>();

    public virtual ICollection<Connection> ConnectionFollowingToNavigations { get; set; } = new List<Connection>();

    public virtual ICollection<Conversation> ConversationUserOneNavigations { get; set; } = new List<Conversation>();

    public virtual ICollection<Conversation> ConversationUserTwoNavigations { get; set; } = new List<Conversation>();

    public virtual ICollection<Interested> Interesteds { get; set; } = new List<Interested>();

    public virtual ICollection<JoinedCommunity> JoinedCommunities { get; set; } = new List<JoinedCommunity>();

    public virtual ICollection<Message> MessageUserReceiverNavigations { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageUserSenderNavigations { get; set; } = new List<Message>();

    public virtual ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();

    public virtual ICollection<PostLike> PostLikes { get; set; } = new List<PostLike>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
