using System.ComponentModel.DataAnnotations;
using dataaccess;
using Microsoft.AspNetCore.Components.Sections;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace tests;

public class GenreTests(MyDbContext ctx, IService<BaseGenreResponse, CreateGenreDto, UpdateGenreDto> service)
{
    [Fact]
    public async Task GetAllGenres()
    {
        var a1 = CreateGenre("TestName");
        var a2 = CreateGenre("TestName2");
        
        ctx.Genres.Add(a1);
        ctx.Genres.Add(a2);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        
        Assert.Equal(2, ctx.Genres.Count());
        // fetch
        var list = await service.Get();
        Assert.Equal(2, list.Count);
    }

    [Theory]
    [InlineData("T")]
    [InlineData("Test Name")]
    public async Task CreateGenre_Success(string name)
    {
        var newA = new CreateGenreDto
        {
            Name = name
        };
        
        var response = await service.Create(newA);
        Assert.Equal(1, ctx.Genres.Count());
        Assert.Equal(name, response.Name);
        Assert.True(response.Id.Length > 0);
        Assert.True(response.CreateAt < DateTime.UtcNow);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public async Task CreateGenre_Fail(string name)
    {
        var newA = new CreateGenreDto
        {
            Name = name
        };
        await Assert.ThrowsAnyAsync<Exception>(async () => await service.Create(newA));
    }

    [Fact]
    public async Task UpdateGenre_Success()
    {
        var a = CreateGenre("TestName");
        ctx.Genres.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Genres.Count());

        var updatedGenreDto = new UpdateGenreDto
        {
            Id = a.Id,
            Name = "New name"
        };
        var response = await service.Update(updatedGenreDto);
        Assert.Equal(1, ctx.Genres.Count());
        Assert.Equal(updatedGenreDto.Name, response.Name);
    }

    [Fact]
    public async Task UpdateGenre_Fail()
    {
        var a = CreateGenre("TestName");
        ctx.Genres.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Genres.Count());

        var updatedGenreDto = new UpdateGenreDto
        {
            Id = a.Id,
            Name = ""
        };
        
        await Assert.ThrowsAnyAsync<ValidationException>(async () => await service.Update(updatedGenreDto));
    }

    [Fact]
    public async Task DeleteGenre_Success()
    {
        var a = CreateGenre("TestName");
        ctx.Genres.Add(a);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        Assert.Equal(1, ctx.Genres.Count());

        await service.Delete(a.Id);
        
        Assert.Equal(0, ctx.Genres.Count());
    }

    [Fact]
    public async Task DeleteGenre_Fail()
    {
        await Assert.ThrowsAnyAsync<Exception>(async () => await service.Delete(Guid.NewGuid().ToString()));
    }

    [Fact(Skip = "Not implemented yet")]
    public async Task DeleteGenre_NotCascade_ButSetNull()
    {
        
    }
    
    private Genre CreateGenre(string name)
    {
        return new Genre
        {
            Id = Guid.NewGuid().ToString(),
            Name = name,
            Createdat = DateTime.UtcNow,
        };
    }
}