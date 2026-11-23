-- NOT VALID enforces the checks on inserts and updates without scanning historical rows.
-- At each end of the name and message, reject the whitespace removed by JS trim().
alter table public.messages
  add constraint messages_name_check check (
    char_length(name) between 1 and 120
    and (left(name, 1) || right(name, 1)) !~ U&'[\0009-\000D\0020\00A0\1680\2000-\200A\2028\2029\202F\205F\3000\FEFF]'
    and name !~ U&'[\0001-\001F\007F-\009F\2028\2029]'
  ) not valid,
  add constraint messages_email_check check (
    char_length(email) <= 254
    -- Match z.email() after lowercasing, including its final local-part character rule.
    and email collate "C" ~ '^([a-z0-9_+''-]+[.])*[a-z0-9_+''-]*[a-z0-9_+-]@([a-z0-9][a-z0-9-]*[.])+[a-z]{2,}$'
  ) not valid,
  add constraint messages_message_check check (
    char_length(message) between 10 and 5000
    and (left(message, 1) || right(message, 1)) !~ U&'[\0009-\000D\0020\00A0\1680\2000-\200A\2028\2029\202F\205F\3000\FEFF]'
    -- Permit internal tabs, line feeds, and carriage returns.
    and message !~ U&'[\0001-\0008\000B\000C\000E-\001F\007F-\009F]'
  ) not valid;
