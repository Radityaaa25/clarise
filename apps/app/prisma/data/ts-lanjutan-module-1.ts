// Konten Modul 1 TypeScript Lanjutan: Generics.
// Diimpor oleh batch5-pemrograman.ts untuk dirakit jadi course "typescript-lanjutan".

const slides = [
  {
    slideNumber: 1,
    type: "lesson",
    title: "Selamat Datang di Generics — Senjata Rahasia TypeScript",
    content: `Selamat datang di TypeScript Lanjutan! Kalau di TypeScript Dasar kamu sudah belajar tentang basic types, interfaces, dan annotations, sekarang saatnya naik level ke fitur paling powerful: **Generics**.

Generics adalah cara TypeScript mengizinkan kamu menulis kode yang **bekerja untuk banyak tipe data berbeda**—tapi tetap mempertahankan type safety. Tanpa generics, kamu akan terjebak di antara dua pilihan buruk: menulis fungsi yang sama berulang-ulang untuk tiap tipe (duplikasi), atau pakai \`any\` dan kehilangan semua keuntungan TypeScript.

**Mengapa Generics begitu penting?** Mayoritas library TypeScript modern—React, RxJS, Prisma, tRPC, Zod—dibangun di atas generics. Kalau kamu pernah pakai \`useState<number>(0)\` di React, kamu sudah pakai generics tanpa sadar. Variabel yang kamu deklarasikan dengan \`useState<number>\` otomatis bertipe \`number\`, dan setter-nya hanya menerima \`number\`. Itulah keajaiban generics.

**Yang akan kamu pelajari di modul ini:**
1. Generic function dan type parameter
2. Bounded generics (\`extends\`) dan constraint
3. Generic interface, type alias, dan class
4. Pattern advanced seperti \`K extends keyof T\`
5. Default type parameter
6. Real-world use case dari ekosistem React/Node

Setelah modul ini selesai, kamu akan bisa membaca dan menulis kode TypeScript yang dipakai di startup-startup teknologi besar. Persiapkan kopi—kita mulai!`,
    keyTakeaway:
      "Generics memungkinkan kamu menulis kode yang reusable untuk banyak tipe—tanpa kehilangan type safety.",
  },
  {
    slideNumber: 2,
    type: "example",
    title: "Masalah Klasik: Kode Duplikat atau Pakai any",
    content: `Mari mulai dengan masalah—kenapa kita butuh generics? Misalnya kamu butuh fungsi yang mengambil elemen pertama dari sebuah array.

\`\`\`typescript
function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}
\`\`\`

Tunggu—kenapa kita harus tulis dua fungsi untuk hal yang sama? Logikanya identik, cuma beda tipe!

**Solusi naif: pakai \`any\`**
\`\`\`typescript
function getFirst(arr: any[]): any {
  return arr[0];
}
\`\`\`

Sekarang kita kehilangan type safety. Lihat:
\`\`\`typescript
const angka = getFirst([1, 2, 3]);
angka.toUpperCase();  // ❌ Compile OK, RUNTIME CRASH!
\`\`\`

Compiler tidak tahu bahwa \`angka\` itu \`number\`. Kita kembali ke era JavaScript yang penuh bug runtime.

**Solusi lain: function overload**
\`\`\`typescript
function getFirst(arr: string[]): string | undefined;
function getFirst(arr: number[]): number | undefined;
function getFirst(arr: any[]): any { return arr[0]; }
\`\`\`

Lebih aman, tapi tidak scalable. Bayangkan kalau kamu butuh dukung 10 tipe? Atau tipe custom dari user? Capek.

**Inilah saat Generics muncul sebagai pahlawan**—solusi yang elegan, ringkas, dan 100% type-safe. Di slide berikutnya kita akan lihat sintaksnya.`,
    keyTakeaway:
      "Tanpa generics, kamu pilih: duplikasi kode untuk tiap tipe, ATAU pakai `any` dan kehilangan keamanan tipe.",
  },
  {
    slideNumber: 3,
    type: "example",
    title: "Memperkenalkan Type Parameter `<T>`",
    content: `Inilah cara generics menyelesaikan masalah tadi:

\`\`\`typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const angka = getFirst([1, 2, 3]);          // angka: number | undefined
const teks = getFirst(["a", "b"]);          // teks: string | undefined
const user = getFirst([{ nama: "Budi" }]);  // user: { nama: string } | undefined
\`\`\`

Tanpa magic, tanpa duplikasi, tanpa \`any\`. Mari bedah:

**\`<T>\`** adalah deklarasi *type parameter*. \`T\` adalah placeholder—seperti variabel, tapi untuk tipe. Saat function dipanggil, TypeScript mengganti \`T\` dengan tipe nyata.

**\`arr: T[]\`** artinya parameter \`arr\` adalah array berisi elemen bertipe \`T\`.

**\`: T | undefined\`** artinya return value bisa \`T\` (kalau ada elemen) atau \`undefined\` (kalau array kosong).

**Type Inference Otomatis**: kamu tidak perlu menulis tipe secara eksplisit—TypeScript pintar. Saat kamu panggil \`getFirst([1, 2, 3])\`, compiler melihat array berisi \`number\`, lalu menyimpulkan \`T = number\`.

**Tapi kamu juga bisa eksplisit** kalau perlu:
\`\`\`typescript
const data = getFirst<string>([]);  // data: string | undefined
\`\`\`

Berguna saat array kosong dan TypeScript tidak bisa menebak.

\`T\` cuma konvensi—kamu boleh pakai nama lain seperti \`<Item>\` atau \`<Element>\` agar lebih deskriptif. Tapi untuk function generic sederhana, \`T\` sudah jadi standar industri.`,
    keyTakeaway:
      "Generic function pakai `<T>` sebagai type parameter—T diganti dengan tipe nyata saat function dipanggil, otomatis (inference) atau eksplisit.",
  },
  {
    slideNumber: 4,
    type: "example",
    title: "Multiple Type Parameters: Bukan Cuma T",
    content: `Function bisa punya **lebih dari satu** type parameter. Konvensinya pakai T, U, K, V berurutan:

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const a = pair("Budi", 25);          // [string, number]
const b = pair(true, ["a", "b"]);    // [boolean, string[]]
\`\`\`

**Setiap type parameter independen**—\`T\` bisa berbeda dari \`U\`. Compiler menyimpulkan tipenya secara terpisah.

**Use case real**: misalnya kamu butuh utility yang menggabungkan dua object.

\`\`\`typescript
function merge<A, B>(obj1: A, obj2: B): A & B {
  return { ...obj1, ...obj2 };
}

const orang = merge(
  { nama: "Budi", umur: 25 },
  { kota: "Jakarta" }
);
// orang: { nama: string; umur: number; kota: string }
\`\`\`

Hasil merge otomatis bertipe **intersection** (\`A & B\`)—gabungan semua field dari kedua object. TypeScript paham, dan IDE auto-complete bekerja sempurna.

**Konvensi penamaan** (yang kamu akan lihat di kode professional):
- \`T\` — Type (paling umum, default)
- \`U\` — type kedua
- \`K\` — Key (biasanya untuk property key)
- \`V\` — Value
- \`E\` — Element (untuk array/iterable)
- \`R\` — Return type

Kamu boleh pakai nama deskriptif penuh (\`<TUser, TPost>\`) untuk function kompleks—tim besar sering memilih ini agar kode lebih self-documenting.`,
    keyTakeaway:
      "Function bisa punya banyak generic parameter (T, U, K, V); konvensi penamaan ini bikin kode professional lebih mudah dibaca.",
  },
  {
    slideNumber: 5,
    type: "example",
    title: "Generics di Interface dan Type Alias",
    content: `Generics bukan cuma untuk function—interface dan type alias juga bisa generic. Ini sangat berguna untuk **wrapper type**.

**Interface generic**:
\`\`\`typescript
interface Box<T> {
  value: T;
  label: string;
}

const angkaBox: Box<number> = { value: 42, label: "Umur" };
const teksBox: Box<string> = { value: "halo", label: "Greeting" };
\`\`\`

**Type alias generic**—powerful banget untuk error handling:
\`\`\`typescript
type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

function fetchUser(id: number): Result<{ nama: string }, string> {
  if (id < 0) return { ok: false, error: "ID invalid" };
  return { ok: true, data: { nama: "Budi" } };
}

const res = fetchUser(1);
if (res.ok) {
  console.log(res.data.nama);  // ✅ TypeScript tahu data ada
} else {
  console.log(res.error);      // ✅ TypeScript tahu error ada
}
\`\`\`

Pattern \`Result<T, E>\` ini diadopsi dari Rust dan sekarang umum di TypeScript modern (Zod, tRPC, neverthrow library). Lebih aman dari throw exception karena error eksplisit dan dipaksa di-handle oleh compiler.

**Use case lain yang sering muncul**:
\`\`\`typescript
type Optional<T> = T | undefined;
type Nullable<T> = T | null;
type ApiResponse<T> = {
  data: T;
  meta: { total: number; page: number };
};
\`\`\`

Saat kamu lihat \`ApiResponse<User>\` di kode, kamu langsung tahu strukturnya: ada field \`data: User\` dan \`meta\` standar. Itulah keindahan generic types.`,
    keyTakeaway:
      "Interface dan type alias bisa generic—pas untuk wrapper type seperti Result<T, E>, ApiResponse<T>, dan Optional<T>.",
  },
  {
    slideNumber: 6,
    type: "casestudy",
    title: "Bounded Generics: Membatasi Tipe dengan `extends`",
    content: `Sampai sekarang, generic kita menerima tipe APA SAJA. Tapi kadang kita butuh **constraint**—generic yang hanya menerima tipe dengan bentuk tertentu.

**Masalah**: misalnya kita ingin function yang return panjang dari sesuatu—string, array, atau object yang punya \`.length\`.

\`\`\`typescript
function getLength<T>(item: T): number {
  return item.length;  // ❌ ERROR: Property 'length' does not exist on type 'T'
}
\`\`\`

TypeScript menolak karena tidak semua \`T\` punya \`.length\`. Solusinya: **constraint** dengan \`extends\`.

\`\`\`typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length;  // ✅ OK
}

getLength("halo");           // 4
getLength([1, 2, 3]);        // 3
getLength({ length: 10 });   // 10
getLength(123);              // ❌ ERROR: number tidak punya length
\`\`\`

\`T extends { length: number }\` artinya: "**T boleh tipe apa saja, ASALKAN punya properti \`length\` bertipe number**". Constraint ini dijaga compiler.

**Pattern yang sering muncul di production**:
\`\`\`typescript
function logEntity<T extends { id: string; createdAt: Date }>(
  entity: T
): void {
  console.log(\`Entity \${entity.id} dibuat pada \${entity.createdAt}\`);
}

// Bisa dipanggil untuk User, Post, Comment, asalkan punya id dan createdAt
logEntity({ id: "u1", createdAt: new Date(), nama: "Budi" });
\`\`\`

Hasilnya: function generic yang **strict secara tipe** tapi **fleksibel terhadap struktur**. Inilah pondasi sistem orang besar seperti Prisma client dan Zod schema.`,
    keyTakeaway:
      "Pakai `T extends { ... }` untuk membatasi generic agar hanya menerima tipe dengan properti tertentu—fleksibel tapi type-safe.",
  },
  {
    slideNumber: 7,
    type: "casestudy",
    title: "Pattern Powerful: `K extends keyof T`",
    content: `Ini adalah salah satu pattern **paling powerful** di TypeScript—type-safe property access dari sebuah object.

**Masalah**: bagaimana cara mengambil properti object berdasarkan nama key, dengan return type yang akurat?

\`\`\`typescript
const user = { nama: "Budi", umur: 25, aktif: true };

function pluck(obj: any, key: string): any {
  return obj[key];
}

const nama = pluck(user, "nama");  // any — kehilangan type safety
\`\`\`

**Solusi dengan generics + keyof**:
\`\`\`typescript
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const nama = pluck(user, "nama");   // string ✅
const umur = pluck(user, "umur");   // number ✅
const x = pluck(user, "tinggi");    // ❌ ERROR: 'tinggi' tidak ada di user
\`\`\`

Mari bedah magic-nya:

**\`keyof T\`**: operator yang menghasilkan **union of all keys** dari \`T\`. Untuk \`user\` di atas, \`keyof T\` adalah \`"nama" | "umur" | "aktif"\`.

**\`K extends keyof T\`**: K harus salah satu key valid dari T. Compiler akan memberi error saat kamu pakai key yang tidak ada—**di compile-time, bukan runtime**!

**\`T[K]\`** (indexed access type): tipe property \`K\` dari \`T\`. Misal jika T = user dan K = "nama", maka \`T[K]\` = \`string\`.

**Use case real di library**:
\`\`\`typescript
function selectFields<T, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) result[key] = obj[key];
  return result;
}

const partial = selectFields(user, ["nama", "umur"]);
// partial: { nama: string; umur: number }
\`\`\`

Inilah cara Prisma's \`select\` dan TypeORM bekerja di balik layar.`,
    keyTakeaway:
      "Kombinasi `K extends keyof T` dan `T[K]` adalah pattern paling powerful untuk type-safe property access dan API selector.",
  },
  {
    slideNumber: 8,
    type: "example",
    title: "Default Type Parameters dan Generic Class",
    content: `**Default Type Parameter**

Kamu bisa kasih default value untuk type parameter—kalau user tidak specify, TypeScript pakai default.

\`\`\`typescript
type ApiResponse<T = unknown> = {
  data: T;
  status: number;
};

function fetchData<T = string>(url: string): Promise<T> {
  return fetch(url).then((r) => r.json());
}

const text = await fetchData("/api/text");           // text: string (default)
const user = await fetchData<User>("/api/user");     // user: User (eksplisit)
\`\`\`

Default sangat berguna untuk library—**experience pemula simple, experience advanced fleksibel**.

**Generic Class**

Class juga bisa generic. Contoh klasik: data structure.

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
const top = numStack.pop();  // top: number | undefined ✅

const strStack = new Stack<string>();
strStack.push("halo");
\`\`\`

Satu kelas, banyak tipe. Type-safe. Reusable. Inilah kenapa generic class jadi backbone library data structure modern.

**Real-world example** dari ekosistem React—Context API:
\`\`\`typescript
const UserContext = createContext<User | null>(null);
\`\`\`

\`createContext<T>\` itu fungsi generic yang return \`Context<T>\`. Saat kamu pakai \`useContext(UserContext)\`, return-nya bertipe \`User | null\` otomatis.`,
    keyTakeaway:
      "Default generic type kasih fallback yang masuk akal; generic class bikin data structure (Stack, Queue) jadi reusable & type-safe.",
  },
  {
    slideNumber: 9,
    type: "casestudy",
    title: "Studi Kasus: Mengapa `useState<T>` Pakai Generics",
    content: `Mari kita bedah salah satu generic paling terkenal di dunia: **\`useState\` dari React**.

\`\`\`typescript
function useState<T>(initial: T): [T, (next: T) => void] {
  // ... implementasi React internal
}
\`\`\`

Sekarang, perhatikan magic-nya:

\`\`\`typescript
const [umur, setUmur] = useState(25);
// umur: number, setUmur: (next: number) => void

const [nama, setNama] = useState("");
// nama: string, setNama: (next: string) => void

const [user, setUser] = useState<{ nama: string } | null>(null);
// user: { nama: string } | null
// setUser: (next: { nama: string } | null) => void
\`\`\`

**Apa yang terjadi di belakang layar?**

1. \`useState(25)\`—TypeScript melihat argumen pertama bertipe \`number\`, jadi \`T = number\`.
2. Return type dihitung: \`[number, (next: number) => void]\`.
3. Saat destructured, \`umur\` jadi \`number\` dan \`setUmur\` adalah function yang HANYA menerima \`number\`.
4. Kalau kamu coba \`setUmur("halo")\`, compiler langsung memberi error.

**Kenapa harus generic, bukan \`any\`?**
\`\`\`typescript
function useStateBuruk(initial: any): [any, (next: any) => void] { ... }
const [umur, setUmur] = useStateBuruk(25);
setUmur("halo");  // ❌ Compile OK, tapi state jadi rusak!
\`\`\`

Tanpa generic, IDE auto-complete tidak akan kasih method yang tepat untuk \`umur\` (apakah \`.toFixed()\` atau \`.toUpperCase()\`?). Kode jadi rentan bug.

**Lesson belajar untukmu sebagai developer**: setiap kali kamu bikin function yang menerima dan mengembalikan **tipe yang sama bentuknya**, kemungkinan besar kamu butuh generic. Itulah pola fundamental.

\`useState\` adalah salah satu contoh terbaik—simpel, namun seluruh ekosistem React modern dibangun di atas pola ini.`,
    keyTakeaway:
      "React's `useState<T>` adalah contoh terbaik kenapa generics penting—type safety penuh dengan inference otomatis dari nilai initial.",
  },
  {
    slideNumber: 10,
    type: "example",
    title: "Multi-constraint dengan Intersection `&`",
    content: `Bagaimana kalau kita butuh generic dengan **lebih dari satu** constraint? Pakai intersection \`&\`.

\`\`\`typescript
interface Bernama {
  nama: string;
}

interface Berumur {
  umur: number;
}

function deskripsikan<T extends Bernama & Berumur>(orang: T): string {
  return \`\${orang.nama} berumur \${orang.umur} tahun.\`;
}

deskripsikan({ nama: "Budi", umur: 25 });                       // ✅
deskripsikan({ nama: "Sari", umur: 30, kota: "Bandung" });      // ✅ extra OK
deskripsikan({ nama: "Andi" });                                  // ❌ butuh umur
deskripsikan({ umur: 25 });                                      // ❌ butuh nama
\`\`\`

\`T extends Bernama & Berumur\` membaca: "**T harus punya semua property dari Bernama DAN semua property dari Berumur**". Fleksibel terhadap properti tambahan, tapi strict pada minimum requirement.

**Use case di production**: REST API client generic.

\`\`\`typescript
interface HasId {
  id: string;
}
interface HasTimestamp {
  createdAt: Date;
  updatedAt: Date;
}

function logChange<T extends HasId & HasTimestamp>(entity: T): void {
  console.log(
    \`Entity \${entity.id} diubah dari \${entity.createdAt} ke \${entity.updatedAt}\`
  );
}
\`\`\`

Function ini bisa dipanggil untuk \`User\`, \`Post\`, \`Comment\`, atau entitas apapun yang punya \`id\` + timestamp—tanpa peduli field lain mereka.

**Tip kapan pakai intersection vs single constraint**:
- **Single** (\`T extends X\`) — satu shape sudah cukup.
- **Intersection** (\`T extends X & Y\`) — butuh kombinasi beberapa shape.
- **Union** di constraint (\`T extends X | Y\`) jarang dipakai dan kadang menyebabkan masalah inference. Hindari kecuali benar-benar perlu.

Pattern intersection constraint ini sangat umum di library ORM (Prisma, Drizzle) dan di middleware Express/Hono untuk validasi shape request.`,
    keyTakeaway:
      "Pakai `&` (intersection) untuk gabungkan beberapa constraint pada satu generic—T harus penuhi semua shape yang disebut.",
  },
  {
    slideNumber: 11,
    type: "challenge",
    title: "Challenge: Type-Safe API Response Wrapper",
    content: `Sekarang waktunya praktik. Kamu sedang membangun frontend untuk aplikasi e-commerce. Setiap call ke API bisa **berhasil** (return data) atau **gagal** (return error message).

Kamu butuh utility type generic yang mewakili kedua kemungkinan tersebut, plus utility function untuk membuat instance success dan error dengan type safety penuh.

Implementasi yang baik akan:
1. Punya satu type \`ApiResult<T>\` yang merepresentasikan dua state.
2. Punya helper function \`success(data)\` dan \`failure(error)\`.
3. Saat user pakai hasil-nya, TypeScript memaksa check apakah berhasil dulu sebelum akses \`.data\`.`,
    challenge: {
      instruction:
        'Definisikan type generic `ApiResult<T>` yang bisa berupa `{ ok: true; data: T }` ATAU `{ ok: false; error: string }`. Lalu buat dua helper function: `success<T>(data: T): ApiResult<T>` dan `failure<T>(error: string): ApiResult<T>`. Pastikan saat user destructure hasilnya, TypeScript memaksa narrow type via `if (result.ok)` sebelum mengakses `.data`.',
      inputType: "code",
      inputPlaceholder:
        "type ApiResult<T> = ...\nfunction success<T>(data: T): ApiResult<T> { ... }\nfunction failure<T>(error: string): ApiResult<T> { ... }",
      starterCode:
        "// Definisikan type ApiResult<T> dan dua helper di sini\n\ntype ApiResult<T> = never; // ganti ini\n\nfunction success<T>(data: T): ApiResult<T> {\n  // implementasi\n  throw new Error('not implemented');\n}\n\nfunction failure<T>(error: string): ApiResult<T> {\n  // implementasi\n  throw new Error('not implemented');\n}",
      expectedConcepts: [
        "Discriminated union: `{ ok: true; data: T }` | `{ ok: false; error: string }`",
        "Field discriminator (`ok`) yang membedakan dua varian",
        "Generic parameter `<T>` untuk data type",
        "Helper functions yang return ApiResult<T> dengan struktur tepat",
      ],
      evaluationCriteria:
        "AI Evaluator: Periksa apakah user mendefinisikan `ApiResult<T>` sebagai discriminated union—dengan field `ok` (atau equivalent seperti `success`, `status`) sebagai discriminator. Struktur idiomatis: `{ ok: true; data: T } | { ok: false; error: string }`. Helper `success<T>(data: T)` harus return `{ ok: true, data }`. Helper `failure<T>(error: string)` harus return `{ ok: false, error }`. Jawaban benar jika type-nya proper discriminated union dan helpers konsisten. Jawaban parsial jika type union ada tapi tidak punya discriminator (misal pakai null check). Jawaban salah jika menggunakan `any` atau struktur tidak coherent. Jangan terjebak ke variasi nama field (boleh `success`, `isOk`, dll) selama tetap discriminated union.",
      hints: [
        "Pikirkan dua state: berhasil dan gagal. Tiap state punya field-nya sendiri (data vs error).",
        "Pakai field literal `ok: true` atau `ok: false` sebagai 'discriminator'—TypeScript bisa narrow type berdasarkan ini.",
        "Helper `success` simpel: `return { ok: true, data }`. Helper `failure` mirror: `return { ok: false, error }`.",
      ],
      sampleAnswer:
        "type ApiResult<T> =\n  | { ok: true; data: T }\n  | { ok: false; error: string };\n\nfunction success<T>(data: T): ApiResult<T> {\n  return { ok: true, data };\n}\n\nfunction failure<T>(error: string): ApiResult<T> {\n  return { ok: false, error };\n}",
      followUpQuestion:
        "Kalau kita mau generic juga untuk error type-nya (bukan cuma string), bagaimana kita ubah signature?",
    },
  },
  {
    slideNumber: 12,
    type: "lesson",
    title: "Pembahasan Challenge: Discriminated Union",
    content: `Solusi paling idiomatis dari challenge tadi:

\`\`\`typescript
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function success<T>(data: T): ApiResult<T> {
  return { ok: true, data };
}

function failure<T>(error: string): ApiResult<T> {
  return { ok: false, error };
}
\`\`\`

Ini adalah pattern yang disebut **discriminated union** (atau *tagged union*). Ciri khasnya: ada field literal (di sini \`ok\`) yang berfungsi sebagai *discriminator*—membedakan varian satu dengan lainnya.

**Magic-nya saat dipakai**:
\`\`\`typescript
const result = success({ nama: "Budi" });

if (result.ok) {
  console.log(result.data.nama);  // ✅ TypeScript tahu data ada
} else {
  console.log(result.error);       // ✅ TypeScript tahu error ada
}

console.log(result.data);          // ❌ Tidak boleh akses langsung—belum di-narrow
\`\`\`

TypeScript secara otomatis melakukan **type narrowing**: di branch \`if (result.ok)\`, dia tahu pasti \`result.data\` ada. Di branch \`else\`, dia tahu pasti \`result.error\` ada.

**Common mistakes**:
- ❌ Pakai \`ok: boolean\` (bukan literal). Hilang kemampuan narrowing—keduanya jadi optional.
- ❌ Lupa generic \`<T>\` di helper. Akhirnya \`success(123)\` return \`ApiResult<unknown>\`.
- ❌ Pakai null check (\`if (result.data !== null)\`) yang kurang explicit dan kurang ergonomic.

**Follow-up: error type juga generic**?
\`\`\`typescript
type ApiResult<T, E = string> =
  | { ok: true; data: T }
  | { ok: false; error: E };

function failure<T, E>(error: E): ApiResult<T, E> {
  return { ok: false, error };
}
\`\`\`

Sekarang error bisa custom: \`ApiResult<User, ValidationError>\`. Inilah cara library seperti **neverthrow** dan **fp-ts** bekerja.`,
    keyTakeaway:
      "Discriminated union (`{ ok: true } | { ok: false }`) adalah pattern paling powerful untuk modeling state success/error dengan type narrowing otomatis.",
  },
  {
    slideNumber: 13,
    type: "lesson",
    title: "Common Pitfalls: Kapan TIDAK Pakai Generics",
    content: `Generics powerful, tapi bukan obat segala masalah. Pakai berlebihan justru membuat kode susah dibaca. Mari bahas pitfall paling umum.

**Pitfall #1: Generic untuk satu use case**

\`\`\`typescript
// ❌ Berlebihan—T cuma dipakai sekali
function tampilkanNama<T extends string>(nama: T): void {
  console.log(nama);
}

// ✅ Cukup string biasa
function tampilkanNama(nama: string): void {
  console.log(nama);
}
\`\`\`

Aturan jempol: **kalau T cuma muncul sekali di signature, kamu mungkin tidak butuh generic**.

**Pitfall #2: Generic tanpa constraint yang dipakai untuk akses property**

\`\`\`typescript
// ❌ T bisa apapun—property mungkin tidak ada
function getName<T>(obj: T): string {
  return (obj as any).name;  // tanda hilangnya type safety
}

// ✅ Kasih constraint yang tepat
function getName<T extends { name: string }>(obj: T): string {
  return obj.name;
}
\`\`\`

**Pitfall #3: Over-generic library API**

\`\`\`typescript
// ❌ Terlalu fleksibel, susah dibaca
function process<T, U, V, W>(a: T, b: U, transform: (t: T, u: U) => V): W { ... }

// ✅ Lebih jelas dengan tipe spesifik
function process<TInput, TOutput>(
  data: TInput,
  transformer: (input: TInput) => TOutput
): TOutput { ... }
\`\`\`

**Pitfall #4: Lupa default value pada generic dengan banyak parameter**

\`\`\`typescript
// ❌ User wajib selalu specify keduanya
type ApiResponse<T, E> = ...

// ✅ Default-nya masuk akal
type ApiResponse<T, E = Error> = ...
\`\`\`

**Best practices**:
1. Mulai tanpa generic. Refactor jadi generic kalau ada duplikasi.
2. Generic constraint harus benar-benar mencerminkan asumsi kode.
3. Nama type parameter deskriptif saat function kompleks (\`<TUser, TPost>\`).
4. Jangan terlalu banyak parameter—kalau lebih dari 3, kemungkinan ada cara lebih baik.

Kode yang baik adalah kode yang **mudah dibaca tim** 6 bulan dari sekarang—bukan demo skill generic.`,
    keyTakeaway:
      "Generic harus melayani kebutuhan nyata—jangan pakai untuk show-off. Pakai saat ada repetisi tipe yang nyata.",
  },
  {
    slideNumber: 14,
    type: "summary",
    title: "Rangkuman Modul: Apa yang Sudah Kamu Kuasai",
    content: `Selamat! Kamu baru saja menyelesaikan salah satu modul terpenting di TypeScript. Mari rangkum apa yang sudah kamu pelajari:

**1. Generic Function**
\`\`\`typescript
function getFirst<T>(arr: T[]): T | undefined { ... }
\`\`\`

**2. Multiple Type Parameters**
\`\`\`typescript
function pair<T, U>(a: T, b: U): [T, U] { ... }
\`\`\`

**3. Generic Interface & Type Alias**
\`\`\`typescript
interface Box<T> { value: T }
type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E }
\`\`\`

**4. Bounded Generic dengan extends**
\`\`\`typescript
function getLength<T extends { length: number }>(item: T): number { ... }
\`\`\`

**5. Pattern \`K extends keyof T\`**
\`\`\`typescript
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] { ... }
\`\`\`

**6. Default Type Parameter**
\`\`\`typescript
type ApiResponse<T = unknown> = { data: T; status: number }
\`\`\`

**7. Generic Class**
\`\`\`typescript
class Stack<T> { items: T[] = [] }
\`\`\`

**8. Multi-constraint Intersection**
\`\`\`typescript
function deskripsi<T extends Bernama & Berumur>(orang: T) { ... }
\`\`\`

**9. Discriminated Union (output challenge)**

**Apa selanjutnya?** Modul berikutnya kita akan mendalami **Utility Types**—\`Partial<T>\`, \`Pick<T, K>\`, \`Omit<T, K>\`, \`Record<K, V>\`, dan banyak lagi. Ini adalah toolkit yang akan kamu pakai setiap hari di kode TypeScript modern.

Kuasai generics, dan kamu akan paham 80% library TypeScript yang dipakai di startup teknologi besar. Sambil tunggu modul 2, **coba refactor satu fungsi di project kamu jadi generic**—rasakan sendiri kekuatannya.`,
    keyTakeaway:
      "Generics adalah pondasi: dari sini kamu siap menguasai utility types, mapped types, dan conditional types yang akan dibahas modul berikutnya.",
  },
  {
    slideNumber: 15,
    type: "quiz",
    title: "Kuis Modul 1: Uji Pemahaman Generics",
    content:
      "Sebelum lanjut ke Modul 2 (Utility Types), pastikan kamu menguasai konsep generics. Sistem akan mengacak 5 soal dari bank kuis—lulus jika nilai ≥ 80.",
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
    id: "ts-lanjut-m1-q1",
    question: "Apa fungsi utama dari generics di TypeScript?",
    options: [
      { id: "a", text: "Mempercepat eksekusi kode di runtime" },
      {
        id: "b",
        text: "Menulis kode yang reusable untuk banyak tipe sambil tetap mempertahankan type safety",
      },
      { id: "c", text: "Mengganti `any` dengan `unknown`" },
      { id: "d", text: "Mengurangi ukuran bundle JavaScript" },
    ],
    correctAnswer: "b",
    explanation:
      "Generics memungkinkan satu fungsi/class/type bekerja untuk banyak tipe data tanpa duplikasi—dan tanpa kehilangan type safety seperti saat pakai `any`.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m1-q2",
    question:
      "Manakah sintaks yang BENAR untuk fungsi generic di TypeScript?",
    options: [
      { id: "a", text: "function getFirst[T](arr: T[]): T" },
      { id: "b", text: "function getFirst(arr: T[]): T<T>" },
      { id: "c", text: "function getFirst<T>(arr: T[]): T" },
      { id: "d", text: "generic function getFirst(arr: T[]): T" },
    ],
    correctAnswer: "c",
    explanation:
      "Type parameter dideklarasikan dalam `<>` setelah nama fungsi, sebelum daftar parameter biasa.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m1-q3",
    question:
      "Apa yang dimaksud dengan `T extends { length: number }`?",
    options: [
      { id: "a", text: "T harus class yang inherit dari class lain" },
      {
        id: "b",
        text: "T boleh tipe apa saja asalkan punya properti `length` bertipe `number`",
      },
      { id: "c", text: "T pasti adalah array" },
      { id: "d", text: "T tidak boleh punya properti `length`" },
    ],
    correctAnswer: "b",
    explanation:
      "`extends` di generic constraint membatasi tipe yang diterima—T boleh tipe apa pun ASALKAN memenuhi shape yang ditentukan.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m1-q4",
    question: "Apa hasil dari operator `keyof` pada object type?",
    options: [
      { id: "a", text: "Daftar nilai dari setiap property" },
      { id: "b", text: "Union of string yang berisi nama-nama property" },
      { id: "c", text: "Sebuah angka yang menunjukkan jumlah property" },
      { id: "d", text: "Boolean yang menyatakan apakah type punya key" },
    ],
    correctAnswer: "b",
    explanation:
      "`keyof T` menghasilkan union literal dari semua nama property di T. Misal `keyof { a: 1; b: 2 }` = `'a' | 'b'`.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m1-q5",
    question:
      "Manakah cara TEPAT untuk memberi default value pada generic parameter?",
    options: [
      { id: "a", text: "type Result<T = string> = ..." },
      { id: "b", text: "type Result<T: string> = ..." },
      { id: "c", text: "type Result<default T as string> = ..." },
      { id: "d", text: "type Result<T extends string = ...>" },
    ],
    correctAnswer: "a",
    explanation:
      "Default type parameter pakai sintaks `T = DefaultType`. Kalau user tidak specify, TypeScript pakai default-nya.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m1-q6",
    question:
      "Apa keunggulan utama discriminated union (`{ ok: true; data: T } | { ok: false; error: E }`) dibanding object dengan `data?: T; error?: E`?",
    options: [
      { id: "a", text: "Lebih sedikit karakter" },
      {
        id: "b",
        text: "TypeScript bisa melakukan type narrowing otomatis berdasarkan field discriminator",
      },
      { id: "c", text: "Compile lebih cepat" },
      { id: "d", text: "Hanya ada satu field" },
    ],
    correctAnswer: "b",
    explanation:
      "Dengan discriminator (`ok: true | false`), TypeScript bisa menentukan branch mana yang aktif di setiap kondisi `if`. Dengan optional fields, kedua-duanya selalu mungkin undefined.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m1-q7",
    question:
      "Apa hasil tipe dari pemanggilan `pluck({ nama: 'Budi', umur: 25 }, 'umur')` jika `pluck<T, K extends keyof T>(obj: T, key: K): T[K]`?",
    options: [
      { id: "a", text: "any" },
      { id: "b", text: "string" },
      { id: "c", text: "number" },
      { id: "d", text: "string | number" },
    ],
    correctAnswer: "c",
    explanation:
      "T[K] = T['umur'] = number. TypeScript menggunakan indexed access type untuk mengambil tipe property tertentu.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m1-q8",
    question:
      "Manakah yang BUKAN konvensi penamaan generic parameter yang lazim?",
    options: [
      { id: "a", text: "T (Type)" },
      { id: "b", text: "K (Key)" },
      { id: "c", text: "V (Value)" },
      { id: "d", text: "X (Extra)" },
    ],
    correctAnswer: "d",
    explanation:
      "Konvensi standar: T, U, V, W untuk type general; K untuk Key; V untuk Value; E untuk Element atau Error; R untuk Return type. X bukan konvensi umum.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m1-q9",
    question:
      "Apa output yang DIHARAPKAN dari kode: `function pair<T, U>(a: T, b: U): [T, U] { return [a, b]; } const p = pair('halo', 25);`?",
    options: [
      { id: "a", text: "p bertipe `[any, any]`" },
      { id: "b", text: "p bertipe `[string, number]`" },
      { id: "c", text: "p bertipe `(string | number)[]`" },
      { id: "d", text: "Compile error karena tipe tidak match" },
    ],
    correctAnswer: "b",
    explanation:
      "TypeScript inference: T = string (dari 'halo'), U = number (dari 25). Return type [T, U] = [string, number].",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m1-q10",
    question:
      "Kapan kamu SEBAIKNYA TIDAK pakai generic di sebuah fungsi?",
    options: [
      {
        id: "a",
        text: "Saat fungsi menerima banyak tipe yang berbeda secara struktural",
      },
      { id: "b", text: "Saat type parameter cuma muncul sekali di signature dan tidak dipakai untuk relate input ke output" },
      { id: "c", text: "Saat fungsi dipanggil di banyak tempat" },
      { id: "d", text: "Saat fungsi return Promise" },
    ],
    correctAnswer: "b",
    explanation:
      "Generic berguna saat T menghubungkan input dan output (atau dipakai di banyak tempat). Kalau cuma muncul sekali, biasanya tipe konkret cukup.",
    difficulty: "hard",
  },
];

export const tsLanjutanModule1 = {
  title: "Generics — Tulis Sekali, Pakai untuk Banyak Tipe",
  slug: "generics",
  order: 1,
  xpReward: 75,
  slides,
  quizBank,
};
