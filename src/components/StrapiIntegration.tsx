"use client";

import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { fetchIncidentTemplates, fetchStaticContent } from "@/lib/strapi";
import type { IncidentTemplate } from "@/lib/strapi";

export default function StrapiIntegration() {
  const [templates, setTemplates] = useState<IncidentTemplate[]>([]);
  const [staticContent, setStaticContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const loadStrapiData = async () => {
    setIsLoading(true);
    try {
      // Fetch incident templates from Strapi
      const incidentTemplates = await fetchIncidentTemplates();
      setTemplates(incidentTemplates);

      // Fetch static content from Strapi
      const content = await fetchStaticContent("static-content");
      setStaticContent(content);

      toast({
        title: "Strapi data loaded",
        description: `Loaded ${incidentTemplates.length} templates and static content`,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error loading Strapi data",
        description: "Check your Strapi configuration",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStrapiData();
  }, []);

  const useTemplate = (template: IncidentTemplate) => {
    // This would typically populate a form with the template data
    console.log("Using template:", template);
    toast({
      title: "Template selected",
      description: template.attributes.title,
      status: "info",
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="lg">Strapi Integration</Heading>
        <Text color="gray.600">Content managed through Strapi CMS</Text>
      </Box>

      {/* Incident Templates from Strapi */}
      <Card>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Incident Templates</Heading>
            {templates.length > 0 ? (
              templates.map((template) => (
                <Box
                  key={template.id}
                  p={4}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                >
                  <VStack align="start" spacing={2}>
                    <Heading size="sm">{template.attributes.title}</Heading>
                    <Text fontSize="sm" color="gray.600">
                      {template.attributes.description}
                    </Text>
                    <HStack spacing={2}>
                      <Badge colorScheme="blue">
                        {template.attributes.severity}
                      </Badge>
                      <Button size="sm" onClick={() => useTemplate(template)}>
                        Use Template
                      </Button>
                    </HStack>
                  </VStack>
                </Box>
              ))
            ) : (
              <Text color="gray.500">
                No templates found. Check your Strapi configuration.
              </Text>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Static Content from Strapi */}
      {staticContent && (
        <Card>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Static Content</Heading>
              <Box
                dangerouslySetInnerHTML={{
                  __html: staticContent.attributes?.content || "",
                }}
              />
            </VStack>
          </CardBody>
        </Card>
      )}

      <Button
        onClick={loadStrapiData}
        isLoading={isLoading}
        colorScheme="brand"
      >
        Refresh Strapi Data
      </Button>
    </VStack>
  );
}
