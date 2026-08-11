create table if not exists users (
  id uuid primary key,
  email text not null unique,
  password_hash text not null,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists auth_sessions (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists auth_sessions_user_idx on auth_sessions(user_id);

create table if not exists characters (
  id uuid primary key,
  owner_id uuid not null references users(id) on delete cascade,
  client_id text,
  name text not null,
  avatar_url text,
  character_data jsonb not null default '{}'::jsonb,
  runtime_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(owner_id, client_id)
);

create table if not exists game_rooms (
  id uuid primary key,
  owner_id uuid not null references users(id) on delete cascade,
  name text not null,
  invite_code text not null unique,
  status text not null default 'open' check (status in ('open','active','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists room_members (
  id uuid primary key,
  room_id uuid not null references game_rooms(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'player' check (role in ('gm','player')),
  character_id uuid references characters(id) on delete set null,
  character_data jsonb not null default '{}'::jsonb,
  runtime_data jsonb not null default '{}'::jsonb,
  avatar_url text,
  joined_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  unique(room_id, user_id)
);

create table if not exists room_npcs (
  id uuid primary key,
  room_id uuid not null references game_rooms(id) on delete cascade,
  name text not null,
  avatar_url text,
  hp integer not null default 10,
  max_hp integer not null default 10,
  defense integer not null default 10,
  attack text not null default '1d6',
  buffs text[] not null default '{}',
  notes text not null default '',
  visible boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists room_media (
  id uuid primary key,
  room_id uuid not null references game_rooms(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  url text not null,
  title text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists room_media_room_idx on room_media(room_id, created_at desc);
create index if not exists room_members_room_idx on room_members(room_id);
create index if not exists room_npcs_room_idx on room_npcs(room_id);
