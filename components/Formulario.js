"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/SendMailForm", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      alert(responseData?.message || "Error al enviar el formulario");

      e.target.reset();
    } catch (error) {
      alert("Error al enviar el formulario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="vender" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">
              Tu mejor oportunidad
            </h2>
            <h3 className="text-4xl font-bold mb-4">Vende con nosotros.</h3>
            <p className="text-xl text-gray-600">
              Brindanos tus datos y estaremos encantados de poder ayudarte a
              encontrar la mejor oportunidad para tu propiedad.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nombres">Nombre y apellidos</Label>
                <Input
                  id="nombres"
                  name="nombres"
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contacto">Celular</Label>
                <Input
                  id="contacto"
                  name="contacto"
                  type="tel"
                  onChange={handleInputChange}
                  placeholder="912345678"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">¿Quieres Vender o Alquilar?</Label>
                <Select
                  onValueChange={(e) => {
                    setFormData({
                      ...formData,
                      Accion: e,
                    });
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vender">Vender</SelectItem>
                    <SelectItem value="alquilar">Alquilar</SelectItem>
                    {/*  Asesoria inmobiliaria */}
                    <SelectItem value="Asesoria">Asesoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="Comentario">Detalle</Label>
                <Textarea
                  id="Comentario"
                  name="Comentario"
                  onChange={handleInputChange}
                  placeholder="Proporciona más detalles sobre tu propiedad..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold  text-xl uppercase"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
