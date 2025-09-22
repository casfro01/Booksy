using System.ComponentModel.DataAnnotations;
using dataaccess;

namespace services.DTOs.Response;

public sealed record BaseGenreResponse
{
    public BaseGenreResponse(Genre g)
    {
        Id = g.Id;
        Name = g.Name;
        CreateAt = g.Createdat;
    }

    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime? CreateAt { get; set; }

    // public List<string> BookIDs { get; set; } = new List<string>(); TODO : til mere advanceret søgning, men det kan altid laves på en anden måde end dette, måske man bare indsender et genre id og får alle bøger associeret med det
}