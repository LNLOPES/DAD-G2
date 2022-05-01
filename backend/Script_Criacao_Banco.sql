CREATE DATABASE ControleConteudo
USE ControleConteudo

CREATE TABLE [dbo].[Content](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [varchar](250) NOT NULL,
	[Description] [varchar](250) NOT NULL,
	[Url] [varchar](max) NOT NULL,
	[DisciplineId] [uniqueidentifier] NOT NULL,
	[TopicId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Discipline](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [varchar](250) NOT NULL,
	[Description] [varchar](250) NOT NULL,
	[TeacherId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[DisciplineStudent](
	[Id] [uniqueidentifier] NOT NULL,
	[DisciplineId] [uniqueidentifier] NOT NULL,
	[StudentId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Topic](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [varchar](250) NOT NULL,
	[Description] [varchar](250) NOT NULL,
	[DisciplineId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


