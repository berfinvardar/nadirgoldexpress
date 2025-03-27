import Image from "next/image";
import Link from "next/link";

export default function Giris() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Image
        src="/logo.svg"
        alt="Nadir Gold Express"
        width={200}
        height={80}
        className="mb-6"
      />

      <h1 className="text-xl font-semibold text-[#1a237e] mb-4">
        Hesabınıza Giriş Yapın
      </h1>

      <div className="w-full max-w-md">
        <input
          type="email"
          placeholder="E-posta adresi"
          className="w-full p-3 mb-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Şifre"
          className="w-full p-3 mb-4 border rounded-md"
        />

        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Beni Hatırla</span>
          </label>
          <Link href="/hesap/sifremi-unuttum" className="text-sm text-blue-600">
            Parolanızı mı unuttunuz?
          </Link>
        </div>

        <button className="w-full bg-[#1a237e] text-white p-3 rounded-md mb-4">
          Giriş Yap
        </button>

        <div className="text-center">
          <span className="text-gray-600">Hesabınız yok mu? </span>
          <Link href="/hesap/uye-ol" className="text-blue-600 font-medium">
            Üye Olun
          </Link>
        </div>
      </div>
    </div>
  );
}
