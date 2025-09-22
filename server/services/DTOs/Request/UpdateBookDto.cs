using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record UpdateBookDto
{
    /// <summary>
    /// Used for lookup ig -- don't judge
    /// </summary>
    [MinLength(2)][Required]public string Id { get; set; } = null!;
    
    [MinLength(1)] public string Title { get; set; } = null!;

    [Range(1, Int32.MaxValue)] public int Pages { get; set; }

    public string? Genreid { get; set; }

    public string? Description { get; set; }

    public List<string> AuthorsIDs { get; set; } = new List<string>();
}