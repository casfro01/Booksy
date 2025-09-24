using System.ComponentModel.DataAnnotations;
using dataaccess;

namespace services.DTOs.Response;

public sealed record BaseAuthorResponse
{
    public BaseAuthorResponse(Author a)
    {
        Id = a.Id;
        Name = a.Name;
        CreateAt = a.Createdat;
        BooksIDs = a.Books.Select(b => b.Id).ToList();
    }

    public string Id { get; set; } = null!;
    public string Name { get; set; }

    public DateTime? CreateAt { get; set; }

    public ICollection<string> BooksIDs { get; set; } = new List<string>();
}