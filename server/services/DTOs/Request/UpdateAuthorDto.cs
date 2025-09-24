using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record UpdateAuthorDto
{
    [MinLength(2)][Required]public string Id { get; set; } = null!;
    [MinLength(1)] public string Name { get; set; } = null!;
    public List<string> BooksIDs { get; set; } = new List<string>();
}