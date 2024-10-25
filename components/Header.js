import { Button } from "@/components/ui/button";
import { PhoneCall, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="font-sans">
      <div className="bg-[#2D2D2D] text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <PhoneCall className="h-4 w-4" />
              <span className="text-sm">+51-998-454-761</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">katya@alvainmobiliarios.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-white hover:text-gray-300">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300">
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="bg-white py-4 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-[#F7B500] font-bold text-3xl">Al</span>
            <span className="text-[#2D2D2D] font-bold text-3xl">va</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-[#2D2D2D] hover:text-[#F7B500]">
              Inicio
            </Link>
            <Link href="/vende" className="text-[#2D2D2D] hover:text-[#F7B500]">
              Vende con nosotros
            </Link>
            <Link
              href="/quienes-somos"
              className="text-[#2D2D2D] hover:text-[#F7B500]"
            >
              Quienes somos
            </Link>
            <Link
              href="/valores"
              className="text-[#2D2D2D] hover:text-[#F7B500]"
            >
              Valores
            </Link>
            <Link
              href="/contactanos"
              className="text-[#2D2D2D] hover:text-[#F7B500]"
            >
              Contactanos
            </Link>
          </div>
          <Button className="bg-[#F7B500] text-white hover:bg-[#E5A800]">
            +51-998-454-761
          </Button>
        </div>
      </nav>
    </header>
  );
}
