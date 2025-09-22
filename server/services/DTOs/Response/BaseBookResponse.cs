using System.ComponentModel.DataAnnotations;
using dataaccess;

namespace services.DTOs.Response;

public sealed record BaseBookResponse
{
    public BaseBookResponse(Book b)
    {
        Id = b.Id;
        Title = b.Title;
        Pages = b.Pages;
        CreateAt = b.Createdat;
        Genreid = b.Genreid;
        Description = b.Description;
        

        AuthorsIDs = b.Authors.Select(a => a.Id).ToList();
    }

    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public int Pages { get; set; }

    public DateTime? CreateAt { get; set; }

    public string? Genreid { get; set; }

    public string? Description { get; set; }

    public ICollection<string> AuthorsIDs { get; set; } = new List<string>();
}