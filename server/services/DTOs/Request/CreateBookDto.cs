using System.ComponentModel.DataAnnotations;
using api.Controllers;

namespace services.DTOs.Request;

public record CreateBookDto
{

    [MinLength(1)] public string Title { get; set; } = null!;

    [Range(1, Int32.MaxValue)] public int Pages { get; set; }

    public string? Genreid { get; set; }

    public string? Description { get; set; } = "";

    public List<string> AuthorsIDs { get; set; } = new List<string>();
}