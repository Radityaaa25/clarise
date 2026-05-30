// Konten Modul 3 TypeScript Lanjutan: Advanced Patterns.

const slides = [
  {
    slideNumber: 1,
    type: "lesson",
    title: "Advanced Patterns — Saatnya Jadi TypeScript Wizard",
    content: `Selamat datang di modul terakhir dan paling powerful! Setelah menguasai generics dan utility types, sekarang kita akan menyelami **fitur paling advanced** di TypeScript—yang membuatmu bisa menulis library kelas dunia.

**Apa yang akan kamu pelajari:**
1. **Mapped Types** — bikin utility type sendiri yang transform setiap property
2. **Conditional Types** — type yang berperilaku berbeda berdasarkan kondisi
3. **\`infer\` keyword** — extract bagian dari type secara dinamis
4. **Template Literal Types** — manipulasi string di level type
5. **Recursive Types** — type yang merujuk dirinya sendiri
6. **Real-world patterns** — type-safe routing, autocomplete from object path

**Kenapa ini level dewa?** Library kelas dunia seperti **Prisma**, **tRPC**, **Drizzle ORM**, dan **Zod** dibangun di atas pola-pola ini. Kalau kamu pernah heran:

- Bagaimana Prisma bisa generate type otomatis dari schema?
- Bagaimana tRPC bisa kasih autocomplete cross-process?
- Bagaimana Zod bisa infer type dari validator?

Jawabannya: kombinasi mapped types, conditional types, dan \`infer\`.

**Peringatan jujur**: modul ini lebih menantang dari dua sebelumnya. Kalau ada slide yang membingungkan, jangan buru-buru—coba tulis ulang code-nya di TypeScript Playground (tsplay.dev), eksperimen sendiri.

**Tujuan akhir**: setelah modul ini, kamu bisa membuat **utility type custom**, **type-safe builder pattern**, dan **API library dengan inference advanced**. Itu skill yang membedakan senior TypeScript engineer dari medior.

Siap masuk ke kedalaman? Mari mulai.`,
    keyTakeaway:
      "Advanced patterns (mapped, conditional, infer, template literal) adalah pondasi library TypeScript kelas dunia—dan akan jadi senjatamu sebagai senior engineer.",
  },
  {
    slideNumber: 2,
    type: "example",
    title: "Mapped Types: Membentuk Type dari Type Lain",
    content: `**Mapped types** adalah cara membuat type baru dengan **memetakan** setiap property dari type lain.

\`\`\`typescript
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

type OptionalUser = {
  [K in keyof User]?: User[K];
};
\`\`\`

Kalau kamu lihat \`Readonly<T>\` dan \`Partial<T>\` dari modul lalu—itu **persis cara mereka diimplementasikan** di TypeScript! Mapped types adalah pondasi semua utility type.

**Sintaks dasar**:
\`\`\`typescript
{ [K in SomeUnion]: ValueType }
\`\`\`

- \`K\` adalah variabel iterasi (nama bebas, biasanya \`K\`)
- \`SomeUnion\` adalah union type (misal \`keyof T\`)
- \`ValueType\` adalah tipe value untuk setiap key

**Contoh 1: Stringify semua field**
\`\`\`typescript
interface User {
  id: number;
  nama: string;
  umur: number;
}

type UserStrings = {
  [K in keyof User]: string;
};
// {
//   id: string;
//   nama: string;
//   umur: string;
// }
\`\`\`

Tipe value diubah jadi \`string\` untuk semua field. Berguna saat kamu serialize semua field jadi string (misal untuk URL params).

**Contoh 2: Bikin getter type**
\`\`\`typescript
type Getters<T> = {
  [K in keyof T]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   id: () => number;
//   nama: () => string;
//   umur: () => number;
// }
\`\`\`

Setiap field jadi function yang return tipe aslinya. Pattern ini dipakai di state management library untuk getter komputed.

Mapped types adalah *meta-programming*—kamu menulis program yang memanipulasi tipe. Powerful banget setelah kamu kuasai sintaksnya.`,
    keyTakeaway:
      "Mapped type `{ [K in keyof T]: ... }` adalah pondasi utility types—memetakan setiap property dari T ke tipe baru.",
  },
  {
    slideNumber: 3,
    type: "example",
    title: "Mapped Type Modifiers: `-?`, `+?`, `-readonly`",
    content: `Mapped types punya **modifier** yang bisa kamu tambah/hilangkan dari setiap property.

**Modifier yang tersedia**:
- \`?\` — tambahkan optional
- \`-?\` — hilangkan optional (force required)
- \`readonly\` — tambahkan readonly
- \`-readonly\` — hilangkan readonly (force mutable)

**Contoh: Required custom yang lebih thorough**
\`\`\`typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type StrictRequired<T> = {
  [K in keyof T]-?: T[K];
};

interface ReadonlyConfig {
  readonly port?: number;
  readonly host?: string;
}

type EditableConfig = Mutable<ReadonlyConfig>;
// {
//   port?: number;
//   host?: string;
// }

type RequiredEditableConfig = Mutable<StrictRequired<ReadonlyConfig>>;
// {
//   port: number;
//   host: string;
// }
\`\`\`

**Use case real #1: Form state derivation**

\`\`\`typescript
interface FormSchema {
  readonly id: string;        // server-generated, readonly
  nama: string;
  email?: string;
}

// Untuk edit form: hapus readonly + buat semua optional
type EditableForm<T> = {
  -readonly [K in keyof T]?: T[K];
};

const draft: EditableForm<FormSchema> = {};  // semua optional + mutable
draft.id = "u1";  // ✅ readonly hilang
\`\`\`

**Use case real #2: Make all properties of all properties readonly (DeepReadonly)**

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface State {
  user: { id: string; nama: string };
  settings: { theme: string };
}

type FrozenState = DeepReadonly<State>;
const s: FrozenState = { ... };
s.user.nama = "Hacked";  // ❌ ERROR—readonly applied recursively
\`\`\`

\`DeepReadonly\` adalah utility yang sering kamu butuh tapi tidak built-in—sekarang kamu bisa bikin sendiri dengan modifier mapped type.

**Tip pro**: \`+\` modifier (\`+?\`, \`+readonly\`) ada tapi default behavior—jarang dipakai eksplisit kecuali untuk readability.`,
    keyTakeaway:
      "Modifier `-?` dan `-readonly` di mapped type kasih kamu kontrol penuh untuk membentuk type—pondasi utility custom.",
  },
  {
    slideNumber: 4,
    type: "example",
    title: "Key Remapping dengan `as` Clause",
    content: `Sejak TypeScript 4.1, mapped type bisa **mengubah nama key** pakai \`as\` clause. Ini fitur yang membuka banyak kemungkinan.

**Sintaks**:
\`\`\`typescript
{ [K in keyof T as NewKey]: ValueType }
\`\`\`

**Contoh klasik: getter pattern**
\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  nama: string;
  umur: number;
}

type UserGetters = Getters<User>;
// {
//   getNama: () => string;
//   getUmur: () => number;
// }
\`\`\`

Magic-nya: kunci asli (\`nama\`) di-transform jadi \`getNama\` pakai template literal type \`\\\`get\${Capitalize<...>}\\\`\`. Capitalize adalah utility built-in untuk huruf besar awal.

**Use case #2: Filter property berdasarkan kondisi**

\`\`\`typescript
type FunctionPropertyNames<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

interface Mixed {
  id: string;
  nama: string;
  greet: () => void;
  fetch: (id: string) => Promise<void>;
}

type OnlyFunctions = FunctionPropertyNames<Mixed>;
// {
//   greet: () => void;
//   fetch: (id: string) => Promise<void>;
// }
\`\`\`

Trick-nya: kalau \`as never\`, key tersebut **dihilangkan** dari hasil. Conditional logic di posisi key-as bisa filter property.

**Use case #3: Rename keys**

\`\`\`typescript
type RenameKeys<T> = {
  [K in keyof T as K extends "id" ? "userId" : K]: T[K];
};

type Renamed = RenameKeys<{ id: string; nama: string }>;
// { userId: string; nama: string }
\`\`\`

**Use case real: Generate event handler types**

\`\`\`typescript
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]?: (value: T[K]) => void;
};

type FormHandlers = EventHandlers<{ nama: string; umur: number }>;
// {
//   onNama?: (value: string) => void;
//   onUmur?: (value: number) => void;
// }
\`\`\`

Pattern ini dipakai oleh framework React form library seperti react-hook-form. Sangat powerful untuk DSL type-safe.`,
    keyTakeaway:
      "Key remapping (`as`) di mapped type buka kekuatan rename, filter, dan generate property names secara dinamis.",
  },
  {
    slideNumber: 5,
    type: "example",
    title: "Conditional Types: T extends U ? X : Y",
    content: `**Conditional types** adalah type yang berperilaku berbeda berdasarkan kondisi—mirip ternary di JavaScript.

\`\`\`typescript
type Cek<T> = T extends string ? "ya string" : "bukan string";

type A = Cek<string>;       // "ya string"
type B = Cek<number>;       // "bukan string"
type C = Cek<"halo">;       // "ya string" (literal masih extends string)
\`\`\`

**Sintaks**:
\`\`\`typescript
T extends U ? TrueBranch : FalseBranch
\`\`\`

Membaca: "**kalau T assignable ke U, hasilnya TrueBranch; kalau tidak, FalseBranch**".

**Use case #1: NonNullable custom**

\`\`\`typescript
type Defined<T> = T extends null | undefined ? never : T;

type X = Defined<string | null>;  // string
type Y = Defined<number | undefined>;  // number
\`\`\`

**Use case #2: Switch berdasarkan tipe**

\`\`\`typescript
type ToString<T> =
  T extends string ? T :
  T extends number ? \`\${T}\` :
  T extends boolean ? "true" | "false" :
  never;

type A = ToString<"halo">;      // "halo"
type B = ToString<42>;          // "42"
type C = ToString<boolean>;     // "true" | "false"
\`\`\`

**Distributive Conditional Types**

Trick paling penting: kalau T adalah union, conditional type **otomatis distributif**.

\`\`\`typescript
type WrapInArray<T> = T extends any ? T[] : never;

type Result = WrapInArray<string | number>;
// (string)[] | (number)[]
// Otomatis pecah ke setiap member union, baru disatukan kembali!
\`\`\`

Pattern \`T extends any ? ...\` adalah cara umum trigger distribution.

**Cara matikan distribution** (kalau gak mau): bungkus T dengan tuple.

\`\`\`typescript
type WrapNoDist<T> = [T] extends [any] ? T[] : never;

type R = WrapNoDist<string | number>;
// (string | number)[]  — tidak distributif
\`\`\`

**Use case real: Filter union member**

\`\`\`typescript
type ExtractStrings<T> = T extends string ? T : never;

type X = ExtractStrings<string | number | boolean>;  // string
\`\`\`

Inilah cara \`Extract<T, U>\` di TypeScript built-in diimplementasikan!

Conditional types adalah **fondasi paling penting** di TypeScript advanced—master ini, dan banyak hal jadi terbuka.`,
    keyTakeaway:
      "Conditional type `T extends U ? X : Y` mirip ternary; kombinasi dengan distributive behavior bikin filter dan transform union jadi mungkin.",
  },
  {
    slideNumber: 6,
    type: "example",
    title: "infer Keyword: Ekstrak Bagian dari Type",
    content: `**\`infer\`** adalah keyword yang digunakan **di dalam conditional type** untuk *menangkap* bagian dari sebuah type.

\`\`\`typescript
type ElementOf<T> = T extends (infer E)[] ? E : never;

type A = ElementOf<string[]>;        // string
type B = ElementOf<number[]>;        // number
type C = ElementOf<{ id: string }[]>; // { id: string }
\`\`\`

Membaca: "**kalau T adalah array dari beberapa tipe E, ambil E**". TypeScript secara otomatis menebak E.

**Use case #1: Ambil return type function**

\`\`\`typescript
type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never;

type A = MyReturnType<() => string>;        // string
type B = MyReturnType<(x: number) => User>; // User
\`\`\`

Inilah cara \`ReturnType\` built-in di-implementasikan!

**Use case #2: Ambil parameter pertama**

\`\`\`typescript
type FirstArg<F> = F extends (first: infer P, ...rest: any[]) => any ? P : never;

type A = FirstArg<(name: string, age: number) => void>;  // string
\`\`\`

**Use case #3: Unwrap Promise**

\`\`\`typescript
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<string>>;   // string
type B = UnwrapPromise<Promise<Promise<number>>>;  // Promise<number> (one-level)
\`\`\`

Untuk **recursive unwrap**, gabungkan dengan recursion:

\`\`\`typescript
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;

type X = DeepUnwrap<Promise<Promise<Promise<User>>>>;  // User
\`\`\`

Itulah cara \`Awaited<T>\` modern bekerja!

**Use case advanced: Ekstrak nama parameter**

\`\`\`typescript
type ParamNames<F> = F extends (...args: infer A) => any
  ? { [K in keyof A]: A[K] }
  : never;
\`\`\`

**Pattern paling sering kamu pakai** dengan \`infer\`:
1. \`T extends Promise<infer U>\` → unwrap Promise
2. \`T extends (infer E)[]\` → ambil element type
3. \`T extends (...args: infer A) => infer R\` → ambil parameter dan return
4. \`T extends \`prefix\${infer Rest}\`\` → ambil bagian string (template literal)

\`infer\` membuka kemampuan TypeScript untuk **membaca struktur type** dan ekstrak bagiannya. Ini fitur yang membuat TypeScript benar-benar unik di antara bahasa typed.`,
    keyTakeaway:
      "`infer` di dalam conditional type adalah cara TypeScript ekstrak bagian dari struktur—fondasi `ReturnType`, `Parameters`, `Awaited`, dan banyak utility custom.",
  },
  {
    slideNumber: 7,
    type: "example",
    title: "Template Literal Types: Manipulasi String di Level Type",
    content: `Sejak TypeScript 4.1, kamu bisa **manipulasi string** di level type—bukan runtime!

\`\`\`typescript
type Greeting<Name extends string> = \`Halo, \${Name}!\`;

type A = Greeting<"Budi">;   // "Halo, Budi!"
type B = Greeting<"Sari">;   // "Halo, Sari!"
\`\`\`

Sintaks-nya seperti template literal di JavaScript, tapi bekerja di compile-time.

**Built-in helpers**:
\`\`\`typescript
type A = Uppercase<"halo">;          // "HALO"
type B = Lowercase<"HALO">;          // "halo"
type C = Capitalize<"halo">;         // "Halo"
type D = Uncapitalize<"Halo">;       // "halo"
\`\`\`

**Use case #1: Generate event names**
\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type Events = EventName<"click" | "hover" | "scroll">;
// "onClick" | "onHover" | "onScroll"
\`\`\`

Distributive lagi! Setiap member union digenerate satu per satu.

**Use case #2: CSS color tokens type-safe**
\`\`\`typescript
type Shade = "100" | "200" | "500" | "900";
type ColorName = "red" | "blue" | "green";
type ColorToken = \`\${ColorName}-\${Shade}\`;

// "red-100" | "red-200" | ... | "green-900" (12 kombinasi)

const color: ColorToken = "red-500";  // ✅
const bad: ColorToken = "purple-500";  // ❌
\`\`\`

**Use case #3: Pattern matching dengan infer**
\`\`\`typescript
type ExtractRoute<T> = T extends \`/api/\${infer Rest}\` ? Rest : never;

type A = ExtractRoute<"/api/users">;       // "users"
type B = ExtractRoute<"/api/posts/123">;   // "posts/123"
type C = ExtractRoute<"/static/file">;     // never
\`\`\`

**Use case #4: Split string ke parts**
\`\`\`typescript
type Split<S extends string, D extends string> =
  S extends \`\${infer Head}\${D}\${infer Tail}\`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Parts = Split<"a.b.c", ".">;
// ["a", "b", "c"]
\`\`\`

Pattern ini dipakai oleh routing libraries (Next.js dynamic routes), CSS-in-JS (theme tokens), dan i18n libraries untuk type-safe key paths.

Template literal types adalah salah satu fitur paling membedakan TypeScript dari bahasa lain—**string manipulation di compile-time**, type-safe.`,
    keyTakeaway:
      "Template literal type bekerja seperti template string biasa, tapi di level type—plus `infer` untuk pattern matching string.",
  },
  {
    slideNumber: 8,
    type: "casestudy",
    title: "Real World #1: Type-Safe Object Path",
    content: `Mari pakai semua yang kita pelajari untuk problem nyata: **type-safe deep object access**.

**Tujuan**: bikin function \`get(obj, "user.address.city")\` yang return tipe yang akurat untuk path string.

**Step 1: Definisikan helper untuk join path**

\`\`\`typescript
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? \`\${K}\` | \`\${K}.\${Path<T[K]>}\`
    : \`\${K}\`
  : never;
\`\`\`

Mari bedah:
- Iterate setiap key K dari T
- Kalau \`T[K]\` adalah object → recursive: kasih \`"K"\` ATAU \`"K.<nested-path>"\`
- Kalau bukan object (primitive) → cukup \`"K"\`

**Step 2: Definisikan type untuk return value berdasarkan path**

\`\`\`typescript
type PathValue<T, P extends string> =
  P extends \`\${infer Head}.\${infer Rest}\`
    ? Head extends keyof T
      ? PathValue<T[Head], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;
\`\`\`

Logikanya:
- Kalau path punya dot (\`"user.address"\`) → split jadi \`Head\` (\`user\`) dan \`Rest\` (\`address\`)
- Recursive ke \`T[Head]\` dengan path \`Rest\`
- Kalau path tunggal → ambil \`T[P]\`

**Step 3: Function**

\`\`\`typescript
function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P> {
  return path.split(".").reduce((o: any, k) => o?.[k], obj);
}
\`\`\`

**Hasil**:

\`\`\`typescript
const data = {
  user: {
    nama: "Budi",
    address: { city: "Jakarta", zip: 12345 }
  }
};

const nama = get(data, "user.nama");          // string ✅
const city = get(data, "user.address.city");  // string ✅
const zip = get(data, "user.address.zip");    // number ✅

get(data, "user.email");      // ❌ ERROR—path tidak valid
get(data, "wrong.path");      // ❌ ERROR—path tidak valid
\`\`\`

**Magic-nya**:
- IDE auto-complete untuk path
- Type return akurat
- Typo langsung ditangkap compiler

Pattern ini dipakai oleh **react-hook-form** (\`setValue("user.address.city", value)\` type-safe), **Lodash typed wrappers**, dan **i18next**. Sekarang kamu paham cara magic-nya bekerja.`,
    keyTakeaway:
      "Kombinasi recursive mapped + template literal + `infer` bisa bikin type-safe deep object access—pattern foundation library form modern.",
  },
  {
    slideNumber: 9,
    type: "casestudy",
    title: "Real World #2: Type-Safe URL Parameter Extraction",
    content: `Use case lain yang sangat berguna: **ekstrak URL parameter dari path string**.

**Goal**: dari path \`"/users/:userId/posts/:postId"\`, generate type \`{ userId: string; postId: string }\`.

**Step 1: Ekstrak satu param**

\`\`\`typescript
type ExtractOne<S extends string> =
  S extends \`:\${infer Param}\` ? Param : never;

type A = ExtractOne<":userId">;  // "userId"
type B = ExtractOne<"users">;    // never (bukan param)
\`\`\`

**Step 2: Split path jadi segments**

\`\`\`typescript
type Split<S extends string, Sep extends string> =
  S extends \`\${infer Head}\${Sep}\${infer Tail}\`
    ? [Head, ...Split<Tail, Sep>]
    : [S];

type Parts = Split<"users/:userId/posts/:postId", "/">;
// ["users", ":userId", "posts", ":postId"]
\`\`\`

**Step 3: Filter param dari segments**

\`\`\`typescript
type ExtractParams<S extends string> = {
  [K in Split<S, "/">[number] as
    K extends \`:\${infer P}\` ? P : never]: string;
};

type Route = ExtractParams<"/users/:userId/posts/:postId">;
// {
//   userId: string;
//   postId: string;
// }
\`\`\`

Magic-nya—pakai \`as\` clause di mapped type untuk **filter** segments yang bukan param dengan trick \`as never\`.

**Step 4: Function URL builder**

\`\`\`typescript
function buildUrl<P extends string>(
  pattern: P,
  params: ExtractParams<P>
): string {
  let url: string = pattern;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(\`:\${key}\`, String(value));
  }
  return url;
}

const url = buildUrl("/users/:userId/posts/:postId", {
  userId: "u1",
  postId: "p2",
});
// "/users/u1/posts/p2"

buildUrl("/users/:userId", { wrong: "x" });  // ❌ ERROR
buildUrl("/users/:userId", {});               // ❌ ERROR—missing userId
\`\`\`

**Aplikasi nyata**: ini persis cara **Next.js App Router** typedRoutes, **TanStack Router**, dan **Hono** menghasilkan type-safe routing. Kamu sekarang punya kemampuan untuk membuat library routing-mu sendiri.

**Variasi advanced**: kalau path punya optional param atau wildcard, kamu bisa extend pattern ini dengan conditional check tambahan. Tapi pattern dasar di atas sudah cover 90% use case.

Inilah type-level programming yang sebenarnya—**TypeScript jadi mini language untuk meta-programming**.`,
    keyTakeaway:
      "Template literal + mapped type + key remapping bisa ekstrak URL param dari path string—pattern di balik Next.js typed routes dan TanStack Router.",
  },
  {
    slideNumber: 10,
    type: "lesson",
    title: "Recursive Types: Type yang Merujuk Diri Sendiri",
    content: `**Recursive types** adalah type yang refer ke dirinya sendiri di definisinya. Sangat berguna untuk struktur data nested seperti tree atau JSON.

**Contoh klasik: JSON value type**

\`\`\`typescript
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const data: JsonValue = {
  nama: "Budi",
  umur: 25,
  alamat: {
    kota: "Jakarta",
    kode: 12345
  },
  hobi: ["baca", "lari"]
};
// ✅ valid

const bad: JsonValue = {
  fn: () => {}  // ❌ ERROR—function bukan JSON value
};
\`\`\`

\`JsonValue\` di-define refer ke dirinya sendiri di array dan object value. TypeScript paham dan bisa validate struktur nested apapun.

**Use case #1: Tree structure**

\`\`\`typescript
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

const tree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [
        { value: "grandchild", children: [] }
      ]
    },
    { value: "child2", children: [] }
  ]
};
\`\`\`

**Use case #2: Linked list**

\`\`\`typescript
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}
\`\`\`

**Use case #3: DeepReadonly**

\`\`\`typescript
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface State {
  user: { nama: string };
  settings: { theme: { primary: string } };
}

type FrozenState = DeepReadonly<State>;
const s: FrozenState = { ... };
s.settings.theme.primary = "red";  // ❌ readonly recursive
\`\`\`

**Use case #4: DeepPartial**

\`\`\`typescript
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
\`\`\`

\`Partial<T>\` built-in cuma satu level—tapi dengan recursion, kamu bisa buat versi yang dive sampai level dalam.

**Hati-hati: TypeScript punya recursion limit**

Recursive types bisa membuat compiler bekerja keras. Kalau kamu hit limit (\`Type instantiation is excessively deep\`), pertimbangkan:
- Tail recursion (struktur yang flat)
- Limit max depth dengan counter
- Hindari recursion saat tidak benar-benar perlu

Recursive types adalah finishing touch untuk pemahaman type-level programming.`,
    keyTakeaway:
      "Recursive type (`type T = ... T ...`) memungkinkan struktur nested seperti JSON tree—plus DeepReadonly, DeepPartial, dan struktur data type-safe lainnya.",
  },
  {
    slideNumber: 11,
    type: "example",
    title: "Combo Power: Builder Pattern Type-Safe",
    content: `Mari satukan semua yang kita pelajari untuk implementasi **type-safe builder pattern**—pola yang dipakai banyak ORM dan query builder.

**Tujuan**: builder yang track state-nya, mencegah method dipanggil di urutan salah.

\`\`\`typescript
// State awal: belum ada apa-apa
type EmptyBuilder = QueryBuilder<{ table: never; where: never }>;

class QueryBuilder<S extends { table: any; where: any }> {
  private _table: string = "";
  private _where: string = "";

  from<T extends string>(
    this: QueryBuilder<S & { table: never }>,
    table: T
  ): QueryBuilder<Omit<S, "table"> & { table: T }> {
    this._table = table;
    return this as any;
  }

  where(
    this: QueryBuilder<S & { table: string }>,
    cond: string
  ): QueryBuilder<S & { where: string }> {
    this._where = cond;
    return this as any;
  }

  execute(this: QueryBuilder<S & { table: string }>): string {
    return \`SELECT * FROM \${this._table}\${
      this._where ? \` WHERE \${this._where}\` : ""
    }\`;
  }
}

const sql = new QueryBuilder<{ table: never; where: never }>()
  .from("users")              // ✅ wajib pertama
  .where("active = 1")        // ✅ butuh from() dulu
  .execute();
// "SELECT * FROM users WHERE active = 1"
\`\`\`

**Apa yang bikin ini powerful?**

\`\`\`typescript
new QueryBuilder<...>()
  .where("active = 1")  // ❌ ERROR: butuh from() dulu
  .execute();
\`\`\`

Compiler memaksa **flow yang benar**. Kalau kamu skip \`from()\`, langsung error. Pola ini disebut **fluent API dengan compile-time state machine**.

**Trick utama**: parameter \`this\` (TypeScript-only). Kamu bisa specify "method ini hanya valid kalau \`this\` punya state tertentu".

**Real world**: pattern ini dipakai oleh **Drizzle ORM**, **Kysely**, dan **GraphQL Code Generator**—mereka tidak hanya kasih method-method, tapi juga **kontrol urutan pemanggilan** lewat type system.

**Combine dengan generics + conditional + mapped types**: kamu bisa bikin builder yang **infer field dari schema**, **validate constraint**, dan **return type yang akurat** berdasarkan operasi yang dilakukan.

Inilah meta-programming TypeScript di puncaknya—type system tidak cuma label, tapi **engine kontrol logika program di compile-time**.`,
    keyTakeaway:
      "Type-safe builder pattern dengan parameter `this` tipe-aware bisa memaksa urutan pemanggilan method—pondasi ORM dan query builder modern.",
  },
  {
    slideNumber: 12,
    type: "challenge",
    title: "Challenge: DeepPartial Generic",
    content: `Sekarang waktunya menguji penguasaan kamu pada advanced patterns.

**Tugas**: buat utility type \`DeepPartial<T>\` yang membuat **semua** property optional, termasuk property nested di level berapapun.

**Kasus uji**:

\`\`\`typescript
interface User {
  id: string;
  profile: {
    nama: string;
    alamat: {
      kota: string;
      kode: number;
    };
  };
  hobi: string[];
}

type R = DeepPartial<User>;
// {
//   id?: string;
//   profile?: {
//     nama?: string;
//     alamat?: {
//       kota?: string;
//       kode?: number;
//     };
//   };
//   hobi?: string[];
// }
\`\`\`

\`Partial<T>\` built-in cuma kerja di level pertama. Kamu butuh recursive solution.`,
    challenge: {
      instruction:
        'Definisikan generic type `DeepPartial<T>` yang membuat semua property dari T jadi optional, termasuk property nested object di level dalam. Untuk array dan primitive, biarkan tetap apa adanya (atau wrap juga dengan DeepPartial sesuai preferensi). Pakai mapped type + recursion + conditional type.',
      inputType: "code",
      inputPlaceholder: "type DeepPartial<T> = ...",
      starterCode:
        "// Definisikan DeepPartial<T> di sini\ntype DeepPartial<T> = never; // ganti",
      expectedConcepts: [
        "Mapped type `{ [K in keyof T]?: ... }` untuk membuat property optional",
        "Conditional type `T extends object ? ... : T` untuk recursion conditional",
        "Recursion: panggil DeepPartial pada nested property",
        "Generic parameter `<T>` untuk reusable",
      ],
      evaluationCriteria:
        "AI Evaluator: Periksa apakah user mendefinisikan `DeepPartial<T>` sebagai mapped type dengan modifier `?` (membuat optional), DAN melakukan recursion: nested object di-wrap juga dengan DeepPartial. Struktur idiomatis: `type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;`. Variasi yang valid: pakai `T extends Function`, `T extends Array<...>`, dll untuk membatasi recursion. Jawaban benar jika output type sesuai test case (semua field optional, recursive). Jawaban parsial jika cuma satu level (= sama dengan Partial<T>) tanpa recursion. Jawaban salah jika tidak generic, tidak recursive, atau pakai `any`. Jangan terjebak di edge case array (boleh di-leave as-is atau wrap, dua-duanya valid).",
      hints: [
        "Mulai dari struktur mapped type biasa: `{ [K in keyof T]?: T[K] }`. Itu sama dengan Partial<T>.",
        "Untuk recursion, tanyakan: kalau T[K] adalah object, kita harus apply DeepPartial juga ke T[K]. Pakai conditional type.",
        "Pattern lengkap: `type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;`. Conditional di luar mapped type biar handle base case (primitive).",
      ],
      sampleAnswer:
        "type DeepPartial<T> = T extends object\n  ? { [K in keyof T]?: DeepPartial<T[K]> }\n  : T;",
      followUpQuestion:
        "Kalau T mengandung array, bagaimana kamu ingin DeepPartial bekerja—biarkan array as-is, atau wrap setiap element dengan DeepPartial?",
    },
  },
  {
    slideNumber: 13,
    type: "lesson",
    title: "Pembahasan Challenge & Best Practices",
    content: `Solusi paling idiomatis dari challenge tadi:

\`\`\`typescript
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;
\`\`\`

Mari bedah:

**Conditional di luar**: \`T extends object ? ... : T\`. Kalau T adalah primitive (string, number, dll), kita kembalikan T apa adanya. Kalau T adalah object, kita transform.

**Mapped type di dalam**: \`{ [K in keyof T]?: ... }\`. Iterate setiap key K dari T, dan tambahkan \`?\` (optional modifier).

**Recursion**: \`DeepPartial<T[K]>\`. Setiap value property juga di-wrap dengan DeepPartial—ini yang bikin "deep". Kalau \`T[K]\` adalah object lagi, dia akan recursion lebih dalam. Kalau primitive, langsung return.

**Common pitfalls**:

❌ **Lupa conditional**:
\`\`\`typescript
type Wrong<T> = { [K in keyof T]?: Wrong<T[K]> };
// Akan fail saat T[K] adalah primitive (string punya keyof yang aneh)
\`\`\`

❌ **Lupa recursion**:
\`\`\`typescript
type ShallowOnly<T> = { [K in keyof T]?: T[K] };
// Sama persis dengan Partial<T>—tidak deep!
\`\`\`

❌ **Pakai \`any\`**:
\`\`\`typescript
type Bad<T> = T extends object ? { [K in keyof T]?: any } : T;
// Hilangkan semua type info di nested level. Useless.
\`\`\`

**Edge case: Array**

\`Array<T>\` adalah object juga, jadi DeepPartial akan iterate keys-nya (\`length\`, \`map\`, \`filter\`, dll)—biasanya bukan yang kita mau. Pattern advanced:

\`\`\`typescript
type DeepPartial<T> = T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
\`\`\`

Sekarang array di-handle khusus.

**Best practices type-level programming**:

1. **Build incrementally**—mulai dari case sederhana, tambahkan kompleksitas pelan-pelan.
2. **Test di TypeScript Playground**—\`tsplay.dev\`, hover untuk lihat hasil type.
3. **Comment yang banyak**—type advanced susah dibaca tanpa konteks.
4. **Cek edge case**: empty object, union, intersection, function, array.
5. **Hindari over-engineering**—kalau utility built-in bisa, pakai itu. Custom cuma kalau benar-benar perlu.
6. **Beware recursion depth**—TypeScript ada limit. Jaga depth kalau bisa.

Selamat, kamu baru saja menulis utility type yang dipakai di codebase production-grade.`,
    keyTakeaway:
      "DeepPartial idiomatic: `T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T`—conditional luar untuk base case, mapped+recursion untuk dive ke dalam.",
  },
  {
    slideNumber: 14,
    type: "summary",
    title: "Rangkuman Modul: Selamat Jadi TypeScript Wizard",
    content: `Selamat menyelesaikan TypeScript Lanjutan! Mari rangkum semua advanced patterns yang kamu kuasai sekarang:

**Mapped Types**
\`\`\`typescript
{ [K in keyof T]: NewType }           // basic
{ [K in keyof T]?: T[K] }             // tambah optional
{ [K in keyof T]-?: NonNullable<T[K]> } // hilangkan optional + null
{ -readonly [K in keyof T]: T[K] }    // hilangkan readonly
{ [K in keyof T as NewKey]: T[K] }    // rename key
\`\`\`

**Conditional Types**
\`\`\`typescript
T extends U ? X : Y                   // ternary type
T extends any ? T[] : never           // distributive
[T] extends [any] ? T[] : never       // non-distributive
\`\`\`

**\`infer\` Patterns**
\`\`\`typescript
T extends Promise<infer U> ? U : T    // unwrap Promise
T extends (infer E)[] ? E : never     // array element
T extends (...a: infer A) => infer R ? [A, R] : never  // function parts
T extends \`prefix-\${infer X}\` ? X : never  // string parts
\`\`\`

**Template Literal Types**
\`\`\`typescript
\`Hello \${Name}\`                       // interpolation
Uppercase<T> | Lowercase<T> | Capitalize<T>  // built-in
\`\${ColorName}-\${Shade}\`               // combinatorial
\`\`\`

**Recursive Types**
\`\`\`typescript
type Tree<T> = { value: T; children: Tree<T>[] }
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T
\`\`\`

**Real-world Patterns**:
- Type-safe object path access (\`get(obj, "user.address.city")\`)
- URL parameter extraction dari path string
- Type-safe builder pattern dengan compile-time state machine
- DeepPartial, DeepReadonly, DeepRequired

**Apa selanjutnya untukmu sebagai TypeScript developer?**

1. **Baca source code library**: Prisma client, tRPC, Zod—semua dibangun di atas pattern di atas.
2. **Praktik di project pribadi**: refactor satu utility manual jadi versi generic dengan pattern advanced.
3. **Eksplor TypeScript Playground**: \`tsplay.dev\`—main-main, hover, lihat compiler error.
4. **Ikuti rilis TypeScript**: setiap 3 bulan ada fitur baru. \`satisfies\`, \`const\` parameter generics, \`NoInfer\`, dll.
5. **Tulis library kecil sendiri**: nothing teaches faster than building real library.

Kamu sudah lulus dari TypeScript Lanjutan. Sekarang buka GitHub, kontribusi ke open source, atau bangun library-mu sendiri. **Jadilah part of the TypeScript community**.

Selamat dan good luck!`,
    keyTakeaway:
      "Mapped + Conditional + infer + Template Literal + Recursion = toolkit lengkap untuk build TypeScript library kelas dunia.",
  },
  {
    slideNumber: 15,
    type: "quiz",
    title: "Kuis Modul 3: Uji Pemahaman Advanced Patterns",
    content:
      "Ini kuis terakhir dari course TypeScript Lanjutan. Pastikan kamu menguasai semua advanced patterns. Sistem akan mengacak 5 soal dari bank kuis—lulus jika nilai ≥ 80.",
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
    id: "ts-lanjut-m3-q1",
    question:
      "Apa hasil dari mapped type ini: `type X = { [K in keyof { a: 1; b: 2 }]: string };`?",
    options: [
      { id: "a", text: "{ a: 1; b: 2 }" },
      { id: "b", text: "{ a: string; b: string }" },
      { id: "c", text: "string" },
      { id: "d", text: "never" },
    ],
    correctAnswer: "b",
    explanation:
      "Mapped type iterate setiap key (a, b) dan kasih value bertipe string. Hasilnya object dengan key sama tapi value type string.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m3-q2",
    question:
      "Apa fungsi modifier `-?` di mapped type?",
    options: [
      { id: "a", text: "Membuat field optional" },
      { id: "b", text: "Menghapus field dari hasil" },
      { id: "c", text: "Menghilangkan optional modifier (membuat field wajib)" },
      { id: "d", text: "Membuat field readonly" },
    ],
    correctAnswer: "c",
    explanation:
      "`-?` menghilangkan modifier optional. Kebalikan dari `?` yang menambahkan optional. Pakai `-readonly` untuk hilangkan readonly.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m3-q3",
    question:
      "Apa hasil dari conditional type ini: `type X = string extends 'halo' ? true : false`?",
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
      { id: "c", text: "boolean" },
      { id: "d", text: "never" },
    ],
    correctAnswer: "b",
    explanation:
      "`string extends 'halo'` itu false—string bersifat lebih luas dari literal 'halo'. Yang sebaliknya (`'halo' extends string`) baru true.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m3-q4",
    question:
      "Bagaimana cara mencegah distributive behavior pada conditional type?",
    options: [
      { id: "a", text: "Pakai `T extends never`" },
      { id: "b", text: "Wrap T dalam tuple: `[T] extends [...]`" },
      { id: "c", text: "Tambahkan `& never`" },
      { id: "d", text: "Tidak bisa dicegah" },
    ],
    correctAnswer: "b",
    explanation:
      "Wrap T dalam tuple `[T]` mencegah distribution di union. Useful saat kamu mau check type secara whole, bukan per-member.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m3-q5",
    question:
      "Apa hasil dari `type R = T extends Promise<infer U> ? U : T;` di mana T = `Promise<string>`?",
    options: [
      { id: "a", text: "Promise<string>" },
      { id: "b", text: "string" },
      { id: "c", text: "never" },
      { id: "d", text: "any" },
    ],
    correctAnswer: "b",
    explanation:
      "`infer U` menangkap tipe yang di-wrap Promise. Karena T = Promise<string>, U = string, dan branch pertama dipilih.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m3-q6",
    question:
      "Apa hasil dari template literal type: `type X = \\`prefix-\\${'a' | 'b'}\\``?",
    options: [
      { id: "a", text: "'prefix-a' | 'prefix-b'" },
      { id: "b", text: "'prefix-ab'" },
      { id: "c", text: "string" },
      { id: "d", text: "'prefix-' & ('a' | 'b')" },
    ],
    correctAnswer: "a",
    explanation:
      "Template literal type bersifat distributive di union—tiap member union digenerate satu per satu, lalu disatukan kembali jadi union baru.",
    difficulty: "medium",
  },
  {
    id: "ts-lanjut-m3-q7",
    question:
      "Apa output dari mapped type dengan key remapping ini: `type X = { [K in 'a' | 'b' as \\`get\\${Capitalize<K>}\\`]: () => K };`?",
    options: [
      { id: "a", text: "{ getA: () => 'a'; getB: () => 'b' }" },
      { id: "b", text: "{ a: () => 'a'; b: () => 'b' }" },
      { id: "c", text: "{ A: 'a'; B: 'b' }" },
      { id: "d", text: "{ getA: 'a'; getB: 'b' }" },
    ],
    correctAnswer: "a",
    explanation:
      "Key remapping (`as`) mengubah nama key dari 'a'/'b' jadi 'getA'/'getB' (Capitalize + prefix). Value-nya tetap function yang return literal aslinya.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m3-q8",
    question:
      "Manakah cara TEPAT membuat `DeepReadonly<T>` yang readonly secara recursive?",
    options: [
      { id: "a", text: "type DeepReadonly<T> = Readonly<T>" },
      {
        id: "b",
        text: "type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T",
      },
      { id: "c", text: "type DeepReadonly<T> = readonly T" },
      { id: "d", text: "type DeepReadonly<T> = { readonly [K: string]: any }" },
    ],
    correctAnswer: "b",
    explanation:
      "Pattern: conditional check object (base case primitive), mapped type dengan readonly modifier, dan recursion ke nested property.",
    difficulty: "hard",
  },
  {
    id: "ts-lanjut-m3-q9",
    question:
      "Apa hasil dari kombinasi conditional + infer: `type ElementOf<T> = T extends Array<infer U> ? U : never;` saat T = `string[]`?",
    options: [
      { id: "a", text: "string[]" },
      { id: "b", text: "string" },
      { id: "c", text: "never" },
      { id: "d", text: "any" },
    ],
    correctAnswer: "b",
    explanation:
      "infer U menangkap element type dari array. Untuk string[], U = string. Conditional kembalikan U.",
    difficulty: "easy",
  },
  {
    id: "ts-lanjut-m3-q10",
    question:
      "Manakah pattern yang BENAR untuk extract URL params dari path string seperti `/users/:userId`?",
    options: [
      {
        id: "a",
        text: "Pakai `infer Param` dengan template literal: `T extends \\`\\${string}:\\${infer Param}/...\\``",
      },
      { id: "b", text: "Pakai `T extends string ? string : never`" },
      { id: "c", text: "Pakai `T extends '/'`" },
      { id: "d", text: "Tidak bisa di TypeScript" },
    ],
    correctAnswer: "a",
    explanation:
      "Template literal type + infer adalah cara TypeScript membaca dan parse string di compile-time. Dipakai oleh Next.js typed routes dan TanStack Router.",
    difficulty: "hard",
  },
];

export const tsLanjutanModule3 = {
  title: "Advanced Patterns — Mapped Types, Conditional, Infer, dan Template Literals",
  slug: "advanced-patterns",
  order: 3,
  xpReward: 100,
  slides,
  quizBank,
};
