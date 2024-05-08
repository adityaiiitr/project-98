"use client"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Attribute {
  attributeName: string;
  attributeType: string;
  attributeValue: string | number | boolean | Date;
}

interface Entity {
  _id: string;
  entityType: string;
  dynamicAttributes: Attribute[];
}

const EditEntity = () => {
  const pathname = usePathname();
  const [entity, setEntity] = useState<Entity | undefined>();

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/api/v1/entity/${pathname.split('/')[2]}`);
        console.log(response.data);
        setEntity(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("done fetching data");
      }
    };

    fetchEntity();
  }, [pathname]);

  // Check if entity is undefined, return loading or placeholder content
  if (!entity) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Entity Page: {pathname}</p>
      <p>Entity Type: {entity.entityType}</p>
      {entity.dynamicAttributes.map((attribute) => (
        <div key={attribute.attributeName}>
            <p>
                {attribute.attributeName}: {attribute.attributeValue as string}
            </p>
        </div>
        ))}
    </main>
  );
};

export default EditEntity;
