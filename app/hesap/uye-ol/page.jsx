import Image from "next/image";
import Link from "next/link";

export default function UyeOl() {
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
        Nadir Gold Express Hesabı Oluşturun
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

        <p className="text-sm mb-4">
          <span>Kişisel verileriniz, </span>
          <Link href="/" className="text-blue-600">
            Aydınlatma Metni
          </Link>
          <span> kapsamında işlenmektedir. "Devam et" butonuna basarak </span>
          <Link href="/uyelik-sozlesmesi" className="text-blue-600">
            Üyelik Sözleşmesi'ni
          </Link>
          <span>, </span>
          <Link href="/" className="text-blue-600">
            Rıza Metni'ni
          </Link>
          <span>, </span>
          <Link href="/" className="text-blue-600">
            Çerez Politikası'nı
          </Link>
          <span> okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.</span>
        </p>

        <button className="w-full bg-[#1a237e] text-white p-3 rounded-md mb-4">
          Devam et
        </button>

        <div className="text-center">
          <span className="text-gray-600">Zaten hesabım var </span>
          <Link href="/hesap/giris" className="text-blue-600 font-medium">
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
