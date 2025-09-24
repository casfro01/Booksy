using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record CreateAuthorDto
{
    [MinLength(1)] public string Name { get; set; } = null!;
    public List<string> BooksIDs { get; set; } = new List<string>();

}