namespace services.Abstractions;

// Rename ? -> reposity designpattern?
/// <summary>
/// Repository abstraction
/// </summary>
/// <typeparam name="TReq">Request type</typeparam>
/// <typeparam name="TRes">Response type</typeparam>
public interface IService<in TReq, TRes>
{
    public List<TRes> Get();
    public TRes Get(string id);

    public TRes Create(TReq request);
    public TRes Update(TReq request);
    public TRes Delete(TReq request);
    public TRes Delete(string id);
}