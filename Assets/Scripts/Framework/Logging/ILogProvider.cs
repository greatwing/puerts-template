using System;
namespace Framework
{
	public interface ILogProvider
	{
		void Verbose(string log);
		void Debug(string log);
		void Warning(string log);
		void Error(string log);
		void CloseLog();
		ILogProvider GetProvider(Type type);
	}
}
