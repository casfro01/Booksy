using Microsoft.AspNetCore.Mvc;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace api.Controllers;

[ApiController]
public class GenreController(IService<BaseGenreResponse, CreateGenreDto, UpdateGenreDto> service) : ControllerBase
{
    [HttpGet(nameof(GetGenre))]
    public async Task<List<BaseGenreResponse>> GetGenre()
    {
        return await service.Get();
    }
    
    /*
    [HttpGet("GetGenre By Id: Not Made")]
    public async Task<BaseGenreResponse> GetGenre(string id)
    {
        return await service.Get(id);
    }
    */
    
    [HttpPost(nameof(CreateGenre))]
    public async Task<BaseGenreResponse> CreateGenre([FromBody] CreateGenreDto dto)
    {
        return await service.Create(dto);
    }
    
    [HttpPut(nameof(UpdateGenre))]
    public async Task<BaseGenreResponse> UpdateGenre([FromBody] UpdateGenreDto dto)
    {
        return await service.Update(dto);
    }
    
    [HttpDelete(nameof(DeleteGenre))]
    public async Task<BaseGenreResponse> DeleteGenre([FromQuery] string id)
    {
        return await service.Delete(id);
    }
}