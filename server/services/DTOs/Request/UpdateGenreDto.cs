using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record UpdateGenreDto
{
    [Required] [MinLength(5)] public string Id { get; set; } = null!;
    [MinLength(1)] [Required] public string Name { get; set; } = null!;
}