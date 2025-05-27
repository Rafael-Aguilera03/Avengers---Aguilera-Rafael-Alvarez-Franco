import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllMembers = async (req, res) => {
  const members = await prisma.member.findMany();
  res.json(members);
};

export const getMemberById = async (req, res) => {
  const member = await prisma.member.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(member);
};

export const createMember = async (req, res) => {
  const { nombre, alias, habilidades, actor } = req.body;
  const newMember = await prisma.member.create({
    data: { nombre, alias, habilidades, actor },
  });
  res.json(newMember);
};

export const updateMember = async (req, res) => {
  const { nombre, alias, habilidades, actor } = req.body;
  const updatedMember = await prisma.member.update({
    where: { id: parseInt(req.params.id) },
    data: { nombre, alias, habilidades, actor },
  });
  res.json(updatedMember);
};

export const deleteMember = async (req, res) => {
  await prisma.member.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json({ message: "Miembro eliminado" });
};