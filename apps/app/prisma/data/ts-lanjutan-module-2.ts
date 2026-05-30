// Konten Modul 2 TypeScript Lanjutan: Utility Types.

const slides = [
  {
    slideNumber: 1,
    type: "lesson",
    title: "Utility Types — Toolkit Wajib Setiap Developer TypeScript",
    content: `Selamat datang di Modul 2! Setelah menguasai generics di Modul 1, sekarang kita akan eksplorasi **utility types**—kumpulan type built-in yang TypeScript sediakan untuk *memanipulasi* tipe lain.

**Apa itu utility type?** Bayangkan kamu punya interface \`User\` dengan 10 field. Lalu kamu butuh:
- Versi yang semua field-nya optional (untuk PATCH endpoint)
- Versi yang cuma 3 field tertentu (untuk preview)
- Versi yang readonly (untuk constant data)

Tanpa utility types, kamu harus tulis 3 interface terpisah—duplikasi yang gampang jadi out-of-sync. Dengan utility types: \`Partial<User>\`, \`Pick<User, "id" | "name" | "email">\`, \`Readonly<User>\`. Selesai dalam satu baris.

**Mengapa ini paling penting di TypeScript professional?**
- Library modern (Prisma, tRPC, Zod, React) sangat tergantung utility types
- Kode jadi DRY (Don't Repeat Yourself)—satu source of truth
- Refactor lebih aman: ubah satu type, semua derivasinya otomatis ikut update

**Yang akan kamu pelajari:**
1. **Object manipulation**: \`Partial\`, \`Required\`, \`Readonly\`, \`Pick\`, \`Omit\`, \`Record\`
2. **Union manipulation**: \`Exclude\`, \`Extract\`, \`NonNullable\`
3. **Function inference**: \`ReturnType\`, \`Parameters\`
4. **Promise unwrapping**: \`Awaited\`

Setelah modul ini, kamu akan punya 10+ utility yang siap pakai di setiap project. Ini adalah Swiss Army Knife setiap TypeScript developer profesional.`,
    keyTakeaway:
      "Utility types adalah type built-in untuk memanipulasi tipe lain—membuat kode DRY, refactor-safe, dan idiomatic.",
  },
  {
    slideNumber: 2,
    type: "example",
    title: "Partial<T>: Semua Field Jadi Opsional",
    content: `\`Partial<T>\` mengubah **semua** properti \`T\` jadi opsional (\`?\`).

\`\`\`typescript
interface User {
  id: string;
  nama: string;
  umur: number;
  email: string;
}

type UserPatch = Partial<User>;
// Equivalent dengan:
// {
//   id?: string;
//   nama?: string;
//   umur?: number;
//   email?: string;
// }

const update: UserPatch = { nama: "Budi Baru" };  // ✅ valid—field lain optional
\`\`\`

**Use case nyata #1: PATCH endpoint**

Saat user update profil, biasanya cuma sebagian field yang berubah—tidak perlu kirim semua. \`Partial<User>\` adalah type yang tepat:

\`\`\`typescript
async function updateUser(
  id: string,
  changes: Partial<User>
): Promise<User> {
  return await fetch(\`/api/users/\${id}\`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  }).then((r) => r.json());
}

await updateUser("u1", { nama: "Sari" });          // ✅
await updateUser("u1", { umur: 30, email: "..." });  // ✅
\`\`\`

**Use case nyata #2: form initial state**

\`\`\`typescript
const [formData, setFormData] = useState<Partial<User>>({});
// User mengisi field satu per satu—formData mulai kosong, gradually filled.
\`\`\`

**Hati-hati**: \`Partial\` itu *shallow*—cuma satu level. Untuk nested object, kamu butuh \`DeepPartial\` (custom utility yang akan kita bahas di modul advanced patterns).

\`\`\`typescript
interface Profil {
  user: { nama: string; umur: number };
  alamat: { kota: string };
}

type P = Partial<Profil>;
// { user?: { nama: string; umur: number }; alamat?: { kota: string } }
// Field nested-nya tetap WAJIB! 'user' optional tapi nama+umur masih required.
\`\`\`

\`Partial<T>\` simple, tapi salah satu utility paling sering kamu pakai dalam karir TypeScript-mu.`,
    keyTakeaway:
      "`Partial<T>` membuat semua field opsional—pas untuk PATCH endpoint, form state, dan optional config object.",
  },
  {
    slideNumber: 3,
    type: "example",
    title: "Required<T>: Kebalikan dari Partial",
    content: `\`Required<T>\` adalah kebalikan dari \`Partial<T>\`—mengubah semua field optional jadi **wajib**.

\`\`\`typescript
interface Config {
  port?: number;
  host?: string;
  debug?: boolean;
}

type StrictConfig = Required<Config>;
// {
//   port: number;
//   host: string;
//   debug: boolean;
// }

const c: StrictConfig = { port: 3000 };  // ❌ ERROR: host & debug required
const c2: StrictConfig = {                // ✅ valid
  port: 3000,
  host: "localhost",
  debug: true,
};
\`\`\`

**Kapan ini berguna?**

**Use case #1: Setelah merge dengan default**

Misal kita terima config user yang sebagian optional, lalu kita merge dengan default:

\`\`\`typescript
const DEFAULT_CONFIG: Required<Config> = {
  port: 3000,
  host: "localhost",
  debug: false,
};

function startServer(userConfig: Config): Required<Config> {
  return { ...DEFAULT_CONFIG, ...userConfig };
}

const final = startServer({ port: 8080 });
console.log(final.host);  // ✅ TypeScript tahu host pasti ada
\`\`\`

**Use case #2: Validasi runtime-completed**

Setelah validasi memastikan semua field ada (misal dengan Zod), kita ingin TypeScript tahu hasilnya \`Required\`:

\`\`\`typescript
function validateConfig(input: Config): Required<Config> {
  if (!input.port) throw new Error("port wajib");
  if (!input.host) throw new Error("host wajib");
  if (input.debug === undefined) throw new Error("debug wajib");
  return input as Required<Config>;
}
\`\`\`

**Common gotcha**: \`Required\` cuma mengubah \`?\` jadi non-optional. Kalau field punya tipe \`string | undefined\`, \`Required\` **tidak** menghilangkan \`undefined\` dari union. Untuk itu, kombinasikan dengan \`NonNullable\` (akan kita bahas).

\`Partial\` dan \`Required\` adalah pasangan yin-yang—satu untuk loosen up, satu untuk tighten up.`,
    keyTakeaway:
      "`Required<T>` membalik Partial—semua field optional jadi wajib, ideal untuk validated data atau merged-with-default config.",
  },
  {
    slideNumber: 4,
    type: "example",
    title: "Readonly<T>: Cegah Mutasi Data",
    content: `\`Readonly<T>\` membuat semua property tidak bisa dimutasi setelah dibuat.

\`\`\`typescript
interface Settings {
  apiUrl: string;
  timeout: number;
}

const config: Readonly<Settings> = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

config.timeout = 10000;  // ❌ ERROR: Cannot assign to 'timeout'
\`\`\`

**Mengapa readonly penting?**

Mutasi tidak terkontrol adalah **sumber bug nomor satu** di kode JavaScript modern. Misal kamu pakai object sebagai konstanta:

\`\`\`typescript
// ❌ Bahaya—config bisa diubah dari mana saja
export const API_CONFIG = {
  timeout: 5000,
  baseUrl: "/api",
};

// Di file lain:
import { API_CONFIG } from "./config";
API_CONFIG.timeout = 0;  // 💥 mutasi global!
\`\`\`

**Solusi**: pakai \`Readonly\` (compile-time) atau \`Object.freeze\` (runtime), atau keduanya:

\`\`\`typescript
export const API_CONFIG: Readonly<{ timeout: number; baseUrl: string }> = {
  timeout: 5000,
  baseUrl: "/api",
} as const;

API_CONFIG.timeout = 0;  // ❌ Compile error
\`\`\`

**Use case di React**:

Props di React idealnya immutable—tidak boleh dimutasi oleh component. Pakai \`Readonly\` di prop type:

\`\`\`typescript
type Props = Readonly<{
  user: User;
  onSelect: (id: string) => void;
}>;

function UserCard({ user, onSelect }: Props) {
  user.nama = "Hacked";  // ❌ TypeScript mencegah
  return <div>{user.nama}</div>;
}
\`\`\`

**Variant: \`ReadonlyArray<T>\` dan \`ReadonlyMap<K, V>\`**

\`\`\`typescript
const ids: ReadonlyArray<string> = ["u1", "u2"];
ids.push("u3");  // ❌ ERROR: push tidak ada di readonly array
\`\`\`

\`Readonly\` adalah pertahanan paling ringan tapi paling efektif terhadap mutasi tidak sengaja. Pakai dimanapun kamu mendeklarasikan "ini shouldn't change".`,
    keyTakeaway:
      "`Readonly<T>` mencegah mutasi properti—pakai untuk config global, props React, dan data konstanta yang harus immutable.",
  },
  {
    slideNumber: 5,
    type: "example",
    title: "Pick<T, K>: Ambil Subset Properti",
    content: `\`Pick<T, K>\` membuat type baru dengan **hanya** properti yang kamu sebutkan.

\`\`\`typescript
interface User {
  id: string;
  nama: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserPublic = Pick<User, "id" | "nama" | "email">;
// {
//   id: string;
//   nama: string;
//   email: string;
// }
\`\`\`

\`K\` adalah union literal dari nama property yang ingin diambil. Compiler memastikan kamu hanya bisa pilih property yang **memang ada** di T—typo seperti \`"emial"\` langsung error.

**Use case nyata #1: Response shape**

Endpoint user public seharusnya tidak mengembalikan password atau internal field:

\`\`\`typescript
function toPublicUser(user: User): Pick<User, "id" | "nama" | "email"> {
  return {
    id: user.id,
    nama: user.nama,
    email: user.email,
  };
}
\`\`\`

**Use case #2: Form yang cuma butuh sebagian field**

\`\`\`typescript
type LoginForm = Pick<User, "email" | "password">;

function login(form: LoginForm): Promise<User> { ... }
\`\`\`

**Use case #3: Reusable selector di Prisma/ORM**

\`\`\`typescript
type CourseListItem = Pick<Course, "id" | "title" | "thumbnail" | "rating">;

const courses: CourseListItem[] = await prisma.course.findMany({
  select: { id: true, title: true, thumbnail: true, rating: true },
});
\`\`\`

**Tip combo dengan generics**:

\`\`\`typescript
function selectFields<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) result[key] = obj[key];
  return result;
}

const partial = selectFields(user, ["id", "nama"]);
// partial: Pick<User, "id" | "nama">
\`\`\`

\`Pick\` membuat type-driven API yang tidak bisa salah pilih field—satu sumber kebenaran, banyak derivasi.`,
    keyTakeaway:
      "`Pick<T, K>` ambil subset properti—pas untuk public response, form schema, dan ORM selector yang tetap type-safe.",
  },
  {
    slideNumber: 6,
    type: "example",
    title: "Omit<T, K>: Kebalikan dari Pick",
    content: `\`Omit<T, K>\` adalah kebalikan \`Pick\`—buang property yang kamu sebutkan, ambil sisanya.

\`\`\`typescript
interface User {
  id: string;
  nama: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserSafe = Omit<User, "password">;
// {
//   id: string;
//   nama: string;
//   email: string;
//   createdAt: Date;
// }
\`\`\`

**Kapan pakai Pick vs Omit?**

- **Pick** kalau kamu cuma butuh **sedikit** field (mudah list yang diambil).
- **Omit** kalau kamu butuh **hampir semua** field kecuali beberapa (mudah list yang dibuang).

\`\`\`typescript
// Pick: ambil 3 dari 10 field
type Preview = Pick<Course, "id" | "title" | "thumbnail">;

// Omit: ambil 9 dari 10 field
type SafeUser = Omit<User, "password">;
\`\`\`

**Use case nyata: Create input**

Saat membuat record baru, kamu biasanya tidak perlu kirim \`id\` atau \`createdAt\` (server yang generate):

\`\`\`typescript
type UserCreateInput = Omit<User, "id" | "createdAt">;

async function createUser(data: UserCreateInput): Promise<User> {
  return await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((r) => r.json());
}
\`\`\`

Pattern ini sangat umum di Prisma, Drizzle, dan ORM modern—mereka generate \`UserCreateInput\` otomatis pakai \`Omit\` di belakang layar.

**Combo dengan Partial untuk update input**:

\`\`\`typescript
type UserUpdateInput = Partial<Omit<User, "id" | "createdAt">>;
// Semua field optional, KECUALI id dan createdAt yang dibuang sama sekali
\`\`\`

Read in plain English: "**ambil semua field User KECUALI id dan createdAt, lalu buat semuanya optional**". Itu shape ideal untuk PATCH endpoint.

**Common pitfall**: \`Omit\` di TypeScript pre-3.5 cuma untuk string keys. TypeScript modern sudah dukung union (\`"a" | "b"\`)—pastikan TS-mu versi 3.5+.

\`Pick\` dan \`Omit\` adalah duo paling sering kamu pakai—biasakan punya keduanya di muscle memory.`,
    keyTakeaway:
      "`Omit<T, K>` buang property tertentu—pas untuk Create input (buang `id`, `createdAt`) dan response sanitization (buang `password`).",
  },
  {
    slideNumber: 7,
    type: "example",
    title: "Record<K, V>: Bikin Object Map Type-Safe",
    content: `\`Record<K, V>\` membuat object type dengan key bertipe \`K\` dan value bertipe \`V\`.

\`\`\`typescript
type RoleAccess = Record<"admin" | "user" | "guest", boolean>;
// {
//   admin: boolean;
//   user: boolean;
//   guest: boolean;
// }

const access: RoleAccess = {
  admin: true,
  user: true,
  guest: false,
};

const a: RoleAccess = { admin: true };  // ❌ ERROR: user & guest hilang
\`\`\`

\`K\` biasanya union string literal (atau enum). \`V\` adalah tipe value-nya.

**Use case #1: Lookup table**

\`\`\`typescript
type StatusLabel = Record<"PENDING" | "SUCCESS" | "FAILED", string>;

const labels: StatusLabel = {
  PENDING: "Menunggu",
  SUCCESS: "Berhasil",
  FAILED: "Gagal",
};

// Akses type-safe:
console.log(labels[status]);  // status harus salah satu key valid
\`\`\`

**Use case #2: Mapping enum ke handler**

\`\`\`typescript
type EventType = "click" | "hover" | "submit";

const handlers: Record<EventType, () => void> = {
  click: () => console.log("clicked"),
  hover: () => console.log("hovered"),
  submit: () => console.log("submitted"),
};

handlers[event]();  // type-safe call
\`\`\`

**Use case #3: Dictionary dengan key dinamis**

\`\`\`typescript
type UserMap = Record<string, User>;

const users: UserMap = {
  "u1": { id: "u1", nama: "Budi", ... },
  "u2": { id: "u2", nama: "Sari", ... },
};

const u = users["u1"];  // type: User (atau undefined kalau kamu pakai noUncheckedIndexedAccess)
\`\`\`

**Tip kombinasi**:

\`\`\`typescript
type CourseByCategory = Record<string, Course[]>;
type FeatureFlags = Record<\`feature_\${string}\`, boolean>;  // template literal type
\`\`\`

**Kelebihan Record dibanding interface manual**:
- Lebih ringkas
- Otomatis sync kalau key list berubah
- Bisa pakai dengan generics: \`Record<K, V>\` di parameter function

\`Record\` jadi ribuan kali kamu pakai saat membuat lookup table, mapping function, dan dictionary type-safe.`,
    keyTakeaway:
      "`Record<K, V>` bikin object type dengan key K dan value V—pas untuk lookup table, event handler map, dan dictionary type.",
  },
  {
    slideNumber: 8,
    type: "example",
    title: "Exclude & Extract: Manipulasi Union",
    content: `\`Exclude<T, U>\` dan \`Extract<T, U>\` bekerja pada **union types**—berbeda dari Pick/Omit yang bekerja pada object types.

**\`Exclude<T, U>\`**: hapus tipe dari union T yang assignable ke U.

\`\`\`typescript
type Status = "draft" | "published" | "archived" | "deleted";

type ActiveStatus = Exclude<Status, "deleted" | "archived">;
// "draft" | "published"

type NonString = Exclude<string | number | boolean, string>;
// number | boolean
\`\`\`

**\`Extract<T, U>\`**: kebalikan—ambil tipe dari union T yang assignable ke U.

\`\`\`typescript
type FinalStatus = Extract<Status, "published" | "archived">;
// "published" | "archived"

type StringsOnly = Extract<string | number | boolean, string>;
// string
\`\`\`

**Use case nyata #1: Filter status berdasarkan kondisi**

\`\`\`typescript
type AllStatus = "draft" | "review" | "published" | "deleted";
type EditableStatus = Exclude<AllStatus, "deleted">;  // semua kecuali deleted

function canEdit(status: EditableStatus): boolean { ... }
canEdit("draft");      // ✅
canEdit("deleted");    // ❌ TypeScript memaksa kamu handle dulu
\`\`\`

**Use case #2: Discriminated union—ambil varian tertentu**

\`\`\`typescript
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "key"; key: string }
  | { type: "scroll"; offset: number };

type ClickEvent = Extract<Event, { type: "click" }>;
// { type: "click"; x: number; y: number }

function handleClick(e: ClickEvent) {
  console.log(e.x, e.y);  // ✅ field click sudah pasti ada
}
\`\`\`

Pattern \`Extract<Union, { discriminator: "value" }>\` ini super powerful untuk action handlers di Redux/Zustand state management.

**Use case #3: Hilangkan literal tertentu untuk validation**

\`\`\`typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type SafeMethod = Exclude<HttpMethod, "DELETE">;  // tanpa DELETE
\`\`\`

\`Exclude\` & \`Extract\` adalah scalpel-mu untuk operasi presisi pada union—kamu akan sering pakai keduanya saat bekerja dengan discriminated union.`,
    keyTakeaway:
      "`Exclude<T, U>` hapus, `Extract<T, U>` ambil—keduanya bekerja di union, ideal untuk filter status dan extract varian discriminated union.",
  },
  {
    slideNumber: 9,
    type: "example",
    title: "NonNullable<T>: Buang null & undefined",
    content: `\`NonNullable<T>\` menghilangkan \`null\` dan \`undefined\` dari sebuah union.

\`\`\`typescript
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

type ApiResult = User | null;
type DefiniteUser = NonNullable<ApiResult>;
// User
\`\`\`

**Use case nyata #1: Setelah validasi/filter**

\`\`\`typescript
const items: (User | null)[] = await fetchUsers();

// Filter null:
const validUsers = items.filter((u): u is NonNullable<typeof u> => u !== null);
// validUsers: User[]
\`\`\`

Notasi \`u is NonNullable<typeof u>\` adalah **type predicate**—memberi tahu compiler bahwa setelah filter, item tidak mungkin null lagi.

**Use case #2: Ekstrak required field dari Partial**

\`\`\`typescript
interface User {
  nama: string;
  bio?: string;
}

type UserBio = NonNullable<User["bio"]>;
// string (tanpa undefined)
\`\`\`

**Use case #3: Pattern dengan generic constraint**

\`\`\`typescript
function ensure<T>(value: T): NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
  return value as NonNullable<T>;
}

const x: string | null = getString();
const y = ensure(x);  // y: string ✅
y.toUpperCase();      // aman
\`\`\`

**Combo dengan Required**:

\`\`\`typescript
interface Config {
  port?: number;
  host?: string;
}

type StrictConfig = {
  [K in keyof Config]: NonNullable<Config[K]>;
};
// { port: number; host: string }
// Berbeda dari Required—Required cuma menghilangkan ?, tidak menghilangkan undefined dari union.
\`\`\`

**Catatan penting**: di TypeScript modern (4.1+), \`NonNullable<T>\` di-implementasikan sebagai \`T & {}\` yang lebih akurat daripada versi lama. Untuk most cases, kamu tidak perlu khawatir—just use it.

\`NonNullable\` simpel tapi sering jadi penyelamat saat bekerja dengan API yang return optional values.`,
    keyTakeaway:
      "`NonNullable<T>` buang `null` dan `undefined` dari union—pas setelah validasi atau saat ekstrak required dari optional field.",
  },
  {
    slideNumber: 10,
    type: "example",
    title: "ReturnType & Parameters: Inferensi dari Function",
    content: `Dua utility ini melakukan **introspection** pada signature function.

**\`ReturnType<F>\`**: ambil tipe yang di-return oleh function F.

\`\`\`typescript
function fetchUser(id: string) {
  return { id, nama: "Budi", umur: 25 };
}

type User = ReturnType<typeof fetchUser>;
// { id: string; nama: string; umur: number }
\`\`\`

Notasi \`typeof fetchUser\` ambil **signature type** dari function. Lalu \`ReturnType<...>\` ambil return type-nya.

**Use case real #1: Sinkronisasi type dengan implementation**

Misal kamu pakai factory function untuk membuat data:

\`\`\`typescript
function createDefaultUser() {
  return {
    nama: "",
    umur: 0,
    role: "guest" as const,
  };
}

type User = ReturnType<typeof createDefaultUser>;
// Otomatis sync—kalau factory diubah, type ikut berubah.
\`\`\`

**Use case #2: Pakai dengan Zod / validator**

\`\`\`typescript
const userSchema = z.object({
  nama: z.string(),
  umur: z.number(),
});

type User = z.infer<typeof userSchema>;
// Equivalent dengan ReturnType-nya parse(), tapi Zod punya helper sendiri
\`\`\`

**\`Parameters<F>\`**: ambil tuple tipe parameter function F.

\`\`\`typescript
function login(email: string, password: string, remember: boolean) {
  // ...
}

type LoginArgs = Parameters<typeof login>;
// [string, string, boolean]

function callLogin(...args: LoginArgs) {
  return login(...args);
}
\`\`\`

**Use case real: Wrapping function**

\`\`\`typescript
function withLogging<F extends (...args: any[]) => any>(fn: F) {
  return (...args: Parameters<F>): ReturnType<F> => {
    console.log("Calling", fn.name, "with", args);
    return fn(...args);
  };
}

const safeLogin = withLogging(login);
safeLogin("a@b.com", "pass", true);  // Type-checked sama persis dengan login
\`\`\`

Higher-order functions seperti ini akan jadi natural setelah kamu nyaman dengan kedua utility ini.

**Tip combo**:

\`\`\`typescript
type FirstArg<F> = Parameters<F>[0];
type LoginEmail = FirstArg<typeof login>;  // string
\`\`\`

\`ReturnType\` dan \`Parameters\` adalah jembatan antara dunia function dan dunia type—powerful untuk metaprogramming.`,
    keyTakeaway:
      "`ReturnType<F>` ambil tipe return, `Parameters<F>` ambil tuple parameter—ideal untuk sync type dengan implementation dan wrap function.",
  },
  {
    slideNumber: 11,
    type: "example",
    title: "Awaited<T>: Unwrap Promise",
    content: `\`Awaited<T>\` "membuka" Promise dan ambil tipe value yang di-resolve.

\`\`\`typescript
type A = Awaited<Promise<string>>;
// string

type B = Awaited<Promise<Promise<number>>>;
// number (recursive—unwrap nested Promise)

type C = Awaited<string>;
// string (kalau bukan Promise, return T itu sendiri)
\`\`\`

**Use case nyata #1: Type dari async function**

\`\`\`typescript
async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as Promise<User>;
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// User (Promise sudah di-unwrap)
\`\`\`

Pattern \`Awaited<ReturnType<typeof asyncFn>>\` ini sering banget dipakai di codebase modern—mendapatkan tipe data dari async function tanpa duplikasi.

**Use case #2: Helper untuk Promise utility**

\`\`\`typescript
async function fetchAll<T extends Record<string, () => Promise<any>>>(
  fns: T
): Promise<{ [K in keyof T]: Awaited<ReturnType<T[K]>> }> {
  const keys = Object.keys(fns) as Array<keyof T>;
  const values = await Promise.all(keys.map((k) => fns[k]()));
  return Object.fromEntries(
    keys.map((k, i) => [k, values[i]])
  ) as any;
}

const data = await fetchAll({
  user: () => fetch("/api/user").then((r) => r.json()) as Promise<User>,
  posts: () => fetch("/api/posts").then((r) => r.json()) as Promise<Post[]>,
});

// data: { user: User; posts: Post[] }
\`\`\`

Pattern advanced ini banyak dipakai di internal Next.js, tRPC, dan SWR.

**Sebelum TypeScript 4.5**, kamu butuh definisi manual:

\`\`\`typescript
// ❌ Pre-4.5 hack
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// ✅ Modern (4.5+)
type X = Awaited<Promise<User>>;  // User
\`\`\`

\`Awaited\` membuat hidup async-typing jauh lebih mudah—pakai dimanapun kamu butuh ekstrak value type dari Promise.`,
    keyTakeaway:
      "`Awaited<T>` unwrap Promise (recursive)—ideal untuk extract data type dari async function, kombinasi dengan `ReturnType`.",
  },
  {
    slideNumber: 12,
    type: "challenge",
    title: "Challenge: Type-Safe Form Builder",
    content: `Sekarang waktunya praktik utility types dalam skenario nyata.

Kamu sedang membuat sistem form builder generic. User akan define schema-nya, lalu sistem secara otomatis menghasilkan tipe untuk: **initial state**, **submitted payload**, dan **partial update**.

Aturan bisnis:
- **Initial state**: semua field optional (form mulai kosong, gradually filled).
- **Submitted payload**: semua field wajib (validasi sudah lewat).
- **Update payload**: semua field optional, tapi minimal satu field harus ada.

Manfaatkan utility types untuk derive ketiga shape ini dari satu \`FormSchema\`.`,
    challenge: {
      instruction:
        'Diberikan interface `FormSchema` (sesuaikan field-nya bebas, contoh: nama, email, umur). Definisikan tiga type alias menggunakan utility types: `FormInitialState<T>` (semua optional), `FormSubmitted<T>` (semua required, non-nullable), dan `FormUpdate<T>` (Partial dari T). Pastikan ketiganya generic terhadap T agar reusable untuk schema apapun.',
      inputType: "code",
      inputPlaceholder:
        "interface FormSchema { ... }\ntype FormInitialState<T> = ...\ntype FormSubmitted<T> = ...\ntype FormUpdate<T> = ...",
      starterCode:
        "interface FormSchema {\n  nama: string;\n  email: string;\n  umur: number;\n}\n\n// Definisikan tiga type alias generic di sini:\ntype FormInitialState<T> = never; // ganti\ntype FormSubmitted<T> = never; // ganti\ntype FormUpdate<T> = never; // ganti",
      expectedConcepts: [
        "Generic type alias dengan parameter `<T>`",
        "Penggunaan `Partial<T>` untuk initial state",
        "Penggunaan `Required<T>` (atau kombinasi dengan NonNullable) untuk submitted",
        "`Partial<T>` untuk update payload",
      ],
      evaluationCriteria:
        "AI Evaluator: Periksa apakah user membuat tiga generic type alias. `FormInitialState<T>` harus pakai `Partial<T>` atau equivalent (semua field optional). `FormSubmitted<T>` harus pakai `Required<T>` atau pendekatan yang membuat semua field non-optional dan non-nullable. `FormUpdate<T>` harus juga `Partial<T>` (atau Partial<T> dengan modifikasi). Boleh pakai mapped type custom jika setara secara semantik. Jawaban benar jika ketiga alias bekerja dengan benar dan generic. Jawaban parsial kalau cuma satu/dua yang benar atau tidak generic. Jawaban salah jika pakai any, tidak generic, atau struktur kacau. Boleh creative untuk FormSubmitted (misal pakai `Required<NonNullable<T>>` atau mapped type)—yang penting hasilnya equivalent.",
      hints: [
        "Untuk initial state, ingat utility yang membuat semua field jadi optional.",
        "Untuk submitted, ingat utility yang kebalikan dari Partial—plus pertimbangkan `NonNullable` jika ada field optional.",
        "Pattern lengkap: `type FormSubmitted<T> = { [K in keyof T]-?: NonNullable<T[K]> };` atau cukup `Required<T>` kalau schema tidak punya null.",
      ],
      sampleAnswer:
        "type FormInitialState<T> = Partial<T>;\n\ntype FormSubmitted<T> = {\n  [K in keyof T]-?: NonNullable<T[K]>;\n};\n\ntype FormUpdate<T> = Partial<T>;",
      followUpQuestion:
        "Bagaimana kamu memodifikasi tipe agar `FormUpdate` memaksa minimal satu field harus ada (tidak bisa object kosong)?",
    },
  },
  {
    slideNumber: 13,
    type: "lesson",
    title: "Pembahasan Challenge: Mapped Types Sneak Peek",
    content: `Solusi paling idiomatis dari challenge tadi:

\`\`\`typescript
type FormInitialState<T> = Partial<T>;

type FormSubmitted<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

type FormUpdate<T> = Partial<T>;
\`\`\`

Mari bedah:

**\`FormInitialState<T>\`** simpel—\`Partial<T>\` membuat semua field opsional, persis yang kita butuh.

**\`FormSubmitted<T>\`** lebih menarik. Kita pakai **mapped type**—syntax \`{ [K in keyof T]: ... }\` yang memetakan setiap key. Tanda \`-?\` artinya **hilangkan optional modifier**. \`NonNullable<T[K]>\` artinya buang null/undefined dari tipe property.

Hasilnya: tiap field non-optional DAN non-nullable—pas untuk data yang sudah lewat validasi.

**Kenapa tidak cukup \`Required<T>\`?**

\`Required<T>\` cuma menghilangkan \`?\`—tapi kalau field punya tipe \`string | undefined\` (tanpa \`?\`), \`Required\` tidak menghilangkan undefined dari union. Mapped type custom kita lebih thorough.

\`\`\`typescript
interface User {
  nama: string;
  bio?: string | null;
}

type R1 = Required<User>;
// { nama: string; bio: string | null }   ← null masih ada!

type R2 = { [K in keyof User]-?: NonNullable<User[K]> };
// { nama: string; bio: string }           ← null hilang
\`\`\`

**Follow-up: Update minimal satu field**

\`\`\`typescript
type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Omit<T, K>>;
}[keyof T];

type FormUpdate<T> = AtLeastOne<T>;
\`\`\`

Pattern ini disebut **discriminated AtLeastOne**—object harus punya minimal satu field K, sisanya optional.

**Common mistakes**:
- ❌ Lupa generic \`<T>\`—type jadi terikat ke schema tertentu.
- ❌ Pakai \`Required<Partial<T>>\`—malah balik ke aslinya, tidak ada efek.
- ❌ Lupa \`NonNullable\`—union dengan null masih lewat.

Kamu baru saja menggunakan **mapped types** secara langsung—itu jembatan ke modul 3. Selamat!`,
    keyTakeaway:
      "Mapped type `{ [K in keyof T]-?: ... }` lebih powerful dari `Required`—bisa hilangkan optional plus modifikasi tipe per-field.",
  },
  {
    slideNumber: 14,
    type: "summary",
    title: "Rangkuman Modul: Toolkit Lengkap Utility Types",
    content: `Selamat menyelesaikan Modul 2! Mari rangkum 10+ utility types yang sudah kamu kuasai:

**Manipulasi Object**
\`\`\`typescript
Partial<User>           // semua optional
Required<User>          // semua required
Readonly<User>          // semua immutable
Pick<User, "id" | "nama"> // ambil subset
Omit<User, "password">  // buang property
Record<"a" | "b", number> // bikin object map
\`\`\`

**Manipulasi Union**
\`\`\`typescript
Exclude<Status, "deleted">   // hapus dari union
Extract<Status, "active">    // ambil dari union
NonNullable<T>               // buang null & undefined
\`\`\`

**Inferensi Function**
\`\`\`typescript
ReturnType<typeof fn>     // tipe return
Parameters<typeof fn>     // tuple parameter
\`\`\`

**Promise**
\`\`\`typescript
Awaited<Promise<User>>   // unwrap Promise
\`\`\`

**Pattern combo paling sering kamu pakai di production**:

\`\`\`typescript
// API Update Endpoint
type UpdateInput<T> = Partial<Omit<T, "id" | "createdAt">>;

// Public response (no sensitive data)
type Public<T> = Omit<T, "password" | "ssn">;

// Form validation result
type Validated<T> = { [K in keyof T]-?: NonNullable<T[K]> };

// Type dari API call
type ApiData = Awaited<ReturnType<typeof apiClient.getUser>>;
\`\`\`

**Mental model untuk kamu**:
- Object → \`Partial\`, \`Required\`, \`Readonly\`, \`Pick\`, \`Omit\`, \`Record\`
- Union → \`Exclude\`, \`Extract\`, \`NonNullable\`
- Function → \`ReturnType\`, \`Parameters\`
- Promise → \`Awaited\`

**Tip pro**: utility types bisa di-compose tanpa batas. \`Partial<Pick<Required<NonNullable<T>>, "id">>\` valid (meskipun pusing). Pelan-pelan, baca dari dalam keluar.

**Selanjutnya: Modul 3 — Advanced Patterns**, di mana kita akan mendalami **mapped types**, **conditional types**, **template literal types**, dan **\`infer\`**. Itu adalah level di mana kamu bisa menulis library TypeScript-mu sendiri.`,
    keyTakeaway:
      "Kuasai 10 utility types ini—Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, ReturnType, Parameters, Awaited—dan kamu siap untuk advanced patterns.",
  },
  {
    slideNumber: 15,
    type: "quiz",
    title: "Kuis Modul 2: Uji Pemahaman Utility Types",
    content:
      "Sebelum lanjut ke Modul 3 (Advanced Patterns), pastikan kamu menguasai utility types. Sistem akan mengacak 5 soal dari bank kuis—lulus jika nilai ≥ 80.",
    quiz: {
      questions: [],
      passingScore: 80,
      totalQuestions: 5,
      timeLimit: 300,
    },
  },
];

const quizBank = [
  {
    id: "ts-lanjut-m2-q1",
    question: "Apa hasil dari `Partial<{ a: string; b: number }>`?",
    options: [
      { id: "a", text: "{ a: string; b: number }" },
      { id: "b", text: "{ a?: string; b?: number }" },
      { id: "c", text: "{ a: string | undefined; b: number | undefined }" },
      { id: "d", text: "{ readonly a: string; readonly b: number }" },
    ],
    correctAnswer: "b",
    explanation:
      "`Partial<T>` membuat setiap field T jadi optional dengan menambahkan modifier `?`.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m2-q2",
    question:
      "Manakah cara yang BENAR untuk membuat type yang berisi hanya `id` dan `nama` dari `User`?",
    options: [
      { id: "a", text: 'Pick<User, ["id", "nama"]>' },
      { id: "b", text: 'Select<User, "id" | "nama">' },
      { id: "c", text: 'Pick<User, "id" | "nama">' },
      { id: "d", text: 'User["id" | "nama"]' },
    ],
    correctAnswer: "c",
    explanation:
      "`Pick<T, K>` di mana K adalah union string literal dari property yang ingin diambil.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m2-q3",
    question: "Apa hasil dari `Omit<User, 'password'>` jika User punya field `id`, `nama`, `password`?",
    options: [
      { id: "a", text: "{ password: string }" },
      { id: "b", text: "{ id: string; nama: string }" },
      { id: "c", text: "{ id: string; nama: string; password: undefined }" },
      { id: "d", text: "User" },
    ],
    correctAnswer: "b",
    explanation:
      "`Omit<T, K>` mengembalikan T tanpa property K—jadi User minus password.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m2-q4",
    question:
      "Apa hasil dari `Exclude<'a' | 'b' | 'c', 'b'>`?",
    options: [
      { id: "a", text: "'a' | 'b' | 'c'" },
      { id: "b", text: "'b'" },
      { id: "c", text: "'a' | 'c'" },
      { id: "d", text: "never" },
    ],
    correctAnswer: "c",
    explanation:
      "`Exclude<T, U>` menghapus tipe dari T yang assignable ke U—dalam kasus ini menghapus 'b'.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m2-q5",
    question:
      "Manakah yang TEPAT untuk membuat object map dari role string ke boolean?",
    options: [
      { id: "a", text: 'Map<"admin" | "user", boolean>' },
      { id: "b", text: 'Record<"admin" | "user", boolean>' },
      { id: "c", text: 'Dict<"admin" | "user", boolean>' },
      { id: "d", text: 'Lookup<"admin" | "user", boolean>' },
    ],
    correctAnswer: "b",
    explanation:
      "`Record<K, V>` adalah utility type built-in untuk membuat object dengan key K dan value V.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m2-q6",
    question:
      "Apa kegunaan dari `NonNullable<T>`?",
    options: [
      {
        id: "a",
        text: "Membuat property tidak boleh kosong di runtime",
      },
      {
        id: "b",
        text: "Menghapus `null` dan `undefined` dari sebuah union type",
      },
      { id: "c", text: "Menambahkan default value ke field optional" },
      { id: "d", text: "Mengkonversi nullable jadi optional" },
    ],
    correctAnswer: "b",
    explanation:
      "`NonNullable<T>` menghilangkan `null` dan `undefined` dari union T—operasi level type, bukan runtime.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m2-q7",
    question:
      "Apa hasil dari `ReturnType<typeof fn>` jika `function fn(): { id: string }`?",
    options: [
      { id: "a", text: "void" },
      { id: "b", text: "{ id: string }" },
      { id: "c", text: "string" },
      { id: "d", text: "() => { id: string }" },
    ],
    correctAnswer: "b",
    explanation:
      "`ReturnType<F>` mengambil tipe yang di-return oleh function F. Kombinasi dengan `typeof fn` mengambil signature function-nya.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m2-q8",
    question:
      "Apa hasil dari `Awaited<Promise<Promise<User>>>`?",
    options: [
      { id: "a", text: "Promise<User>" },
      { id: "b", text: "User" },
      { id: "c", text: "Promise<Promise<User>>" },
      { id: "d", text: "never" },
    ],
    correctAnswer: "b",
    explanation:
      "`Awaited<T>` melakukan unwrap Promise secara recursive—jadi nested Promise pun di-unwrap habis sampai value paling dalam.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m2-q9",
    question:
      "Manakah cara TEPAT untuk membuat type 'semua field User wajib (non-optional dan non-nullable)' jika beberapa field bertipe `string | null` atau punya `?`?",
    options: [
      { id: "a", text: "Required<User>" },
      { id: "b", text: "{ [K in keyof User]-?: NonNullable<User[K]> }" },
      { id: "c", text: "Partial<User>" },
      { id: "d", text: "Pick<User, keyof User>" },
    ],
    correctAnswer: "b",
    explanation:
      "Mapped type dengan `-?` (hilangkan optional) plus `NonNullable` di setiap value memastikan tidak ada `?`, `null`, atau `undefined`. `Required<T>` cuma hilangkan `?`, tidak hilangkan null dari union.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m2-q10",
    question:
      "Apa keunggulan combo `Partial<Omit<T, 'id' | 'createdAt'>>` di context update endpoint?",
    options: [
      { id: "a", text: "Lebih pendek dari Partial<T>" },
      {
        id: "b",
        text: "Mengizinkan update sebagian (Partial) tapi mencegah user mengirim id atau createdAt yang seharusnya server-generated (Omit)",
      },
      { id: "c", text: "Membuat field readonly" },
      { id: "d", text: "Menambahkan validasi runtime otomatis" },
    ],
    correctAnswer: "b",
    explanation:
      "Pattern ini menggabungkan dua aturan: `Omit` membuang field yang tidak boleh diubah user, `Partial` membuat sisanya optional sehingga user cuma kirim field yang ingin diubah.",
    difficulty: "hard",
  },
];

export const tsLanjutanModule2 = {
  title: "Utility Types — Toolkit Wajib TypeScript Profesional",
  slug: "utility-types",
  order: 2,
  xpReward: 80,
  slides,
  quizBank,
};
