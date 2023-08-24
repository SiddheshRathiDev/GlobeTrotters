using System;
using System.Collections.Generic;
using Dacproject.Models;
using Microsoft.EntityFrameworkCore;
using WebApplicationMySql.DTO;

namespace Dacproject.Data;

public partial class DacprojectContext : DbContext
{
    public DacprojectContext(DbContextOptions<DacprojectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Community> Communities { get; set; }

    public virtual DbSet<Connection> Connections { get; set; }

    public virtual DbSet<Conversation> Conversations { get; set; }

    public virtual DbSet<Interested> Interesteds { get; set; }

    public virtual DbSet<JoinedCommunity> JoinedCommunities { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<PostComment> PostComments { get; set; }

    public virtual DbSet<PostLike> PostLikes { get; set; } 

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Admin>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("admin");

            entity.HasIndex(e => e.AdminId, "admin_id");

            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");

            entity.HasOne(d => d.AdminNavigation).WithMany()
                .HasForeignKey(d => d.AdminId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("admin_ibfk_1");
        });

        modelBuilder.Entity<Community>(entity =>
        {
            entity.HasKey(e => e.CommunityId).HasName("PRIMARY");

            entity.ToTable("community");

            entity.HasIndex(e => e.AdminUserId, "admin_user_id");

            entity.Property(e => e.CommunityId).HasColumnName("community_id");
            entity.Property(e => e.AdminUserId).HasColumnName("admin_user_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");

            entity.HasOne(d => d.AdminUser).WithMany(p => p.Communities)
                .HasForeignKey(d => d.AdminUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("community_ibfk_1");
        });

        modelBuilder.Entity<Connection>(entity =>
        {
            entity.HasKey(e => e.ConnectionId).HasName("PRIMARY");

            entity.ToTable("connection");

            entity.HasIndex(e => e.FollowedBy, "followed_by");

            entity.HasIndex(e => e.FollowingTo, "following_to");

            entity.Property(e => e.ConnectionId).HasColumnName("connection_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.FollowedBy).HasColumnName("followed_by");
            entity.Property(e => e.FollowingTo).HasColumnName("following_to");

            entity.HasOne(d => d.FollowedByNavigation).WithMany(p => p.ConnectionFollowedByNavigations)
                .HasForeignKey(d => d.FollowedBy)
                .HasConstraintName("connection_ibfk_2");

            entity.HasOne(d => d.FollowingToNavigation).WithMany(p => p.ConnectionFollowingToNavigations)
                .HasForeignKey(d => d.FollowingTo)
                .HasConstraintName("connection_ibfk_1");
        });

        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.ConversationId).HasName("PRIMARY");

            entity.ToTable("conversation");

            entity.HasIndex(e => e.UserOne, "user_one");

            entity.HasIndex(e => e.UserTwo, "user_two");

            entity.Property(e => e.ConversationId).HasColumnName("conversation_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.UserOne).HasColumnName("user_one");
            entity.Property(e => e.UserTwo).HasColumnName("user_two");

            entity.HasOne(d => d.UserOneNavigation).WithMany(p => p.ConversationUserOneNavigations)
                .HasForeignKey(d => d.UserOne)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("conversation_ibfk_1");

            entity.HasOne(d => d.UserTwoNavigation).WithMany(p => p.ConversationUserTwoNavigations)
                .HasForeignKey(d => d.UserTwo)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("conversation_ibfk_2");
        });

        modelBuilder.Entity<Interested>(entity =>
        {
            entity.HasKey(e => e.InterestedId).HasName("PRIMARY");

            entity.ToTable("interested");

            entity.HasIndex(e => e.TripId, "trip_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.InterestedId).HasColumnName("interested_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.TripId).HasColumnName("trip_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Trip).WithMany(p => p.Interesteds)
                .HasForeignKey(d => d.TripId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("interested_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Interesteds)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("interested_ibfk_1");
        });

        modelBuilder.Entity<JoinedCommunity>(entity =>
        {
            entity.HasKey(e => e.JoinedCommunityId).HasName("PRIMARY");

            entity.ToTable("joined_community");

            entity.HasIndex(e => e.CommunityId, "community_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.JoinedCommunityId).HasColumnName("joined_community_id");
            entity.Property(e => e.CommunityId).HasColumnName("community_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Community).WithMany(p => p.JoinedCommunities)
                .HasForeignKey(d => d.CommunityId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("joined_community_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.JoinedCommunities)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("joined_community_ibfk_1");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PRIMARY");

            entity.ToTable("message");

            entity.HasIndex(e => e.UserReceiver, "user_receiver");

            entity.HasIndex(e => e.UserSender, "user_sender");

            entity.Property(e => e.MessageId).HasColumnName("message_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.UserReceiver).HasColumnName("user_receiver");
            entity.Property(e => e.UserSender).HasColumnName("user_sender");

            entity.HasOne(d => d.UserReceiverNavigation).WithMany(p => p.MessageUserReceiverNavigations)
                .HasForeignKey(d => d.UserReceiver)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("message_ibfk_2");

            entity.HasOne(d => d.UserSenderNavigation).WithMany(p => p.MessageUserSenderNavigations)
                .HasForeignKey(d => d.UserSender)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("message_ibfk_1");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.PostId).HasName("PRIMARY");

            entity.ToTable("post");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.Caption)
                .HasMaxLength(200)
                .HasColumnName("caption");
            entity.Property(e => e.CommentsCount).HasColumnName("comments_count");
            entity.Property(e => e.CreatedDatetime)
                .HasColumnType("datetime")
                .HasColumnName("created_datetime");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.LikesCount).HasColumnName("likes_count");
            entity.Property(e => e.PostUrl)
                .HasMaxLength(500)
                .HasColumnName("post_url");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Posts)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("post_ibfk_1");
        });

        modelBuilder.Entity<PostComment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PRIMARY");

            entity.ToTable("post_comment");

            entity.HasIndex(e => e.PostId, "post_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.CommentId).HasColumnName("comment_id");
            entity.Property(e => e.CreatedDatetime)
                .HasColumnType("datetime")
                .HasColumnName("created_datetime");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Post).WithMany(p => p.PostComments)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("post_comment_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.PostComments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("post_comment_ibfk_1");
        });

        modelBuilder.Entity<PostLike>(entity =>
        {
            entity.HasKey(e => e.LikeId).HasName("PRIMARY");

            entity.ToTable("post_like");

            entity.HasIndex(e => e.PostId, "post_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.LikeId).HasColumnName("like_id");
            entity.Property(e => e.CreatedDatetime)
                .HasColumnType("datetime")
                .HasColumnName("created_datetime");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Post).WithMany(p => p.PostLikes)
                .HasForeignKey(d => d.PostId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("post_like_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.PostLikes)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("post_like_ibfk_1");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.TripId).HasName("PRIMARY");

            entity.ToTable("trip");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.TripId).HasColumnName("trip_id");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.InterestedCount).HasColumnName("interested_count");
            entity.Property(e => e.Itinerary)
                .HasMaxLength(500)
                .HasColumnName("itinerary");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Trips)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("trip_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.UserName, "user_name").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Dob).HasColumnName("dob");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Extra1)
                .HasMaxLength(0)
                .HasColumnName("extra1");
            entity.Property(e => e.Extra2)
                .HasMaxLength(0)
                .HasColumnName("extra2");
            entity.Property(e => e.Extra3)
                .HasMaxLength(0)
                .HasColumnName("extra3");
            entity.Property(e => e.Extra4)
                .HasMaxLength(0)
                .HasColumnName("extra4");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.Mobile)
                .HasMaxLength(12)
                .HasColumnName("mobile");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.ProfilePhoto)
                .HasMaxLength(500)
                .HasColumnName("profile_photo");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasColumnName("user_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
