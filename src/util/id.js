let id = 0;
export default function getID(prefix = 'id-') {
  id++;
  return prefix + id;
}
