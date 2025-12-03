import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Stack,
  StackItem,
  Content,
  Grid,
  GridItem,
  TextArea,
  Button,
  ActionGroup,
  Alert,
  Divider,
  Flex,
  FlexItem,
  Select,
  SelectOption,
  Icon,
  MenuToggle,
} from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { ExclamationTriangleIcon, InfoCircleIcon } from '@patternfly/react-icons';

const PreflightSummary: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [yamlContent, setYamlContent] = React.useState(`apiVersion: v1
kind: ClusterUpgrade
metadata:
  name: cluster-upgrade-preflight
spec:
  currentVersion: 4.18.16
  targetVersion: 5.00.01
  clusterId: ocp-cluster-abc123-def456-ghi789
  upgradeSequence:
    - control-plane
    - core-operators
    - workers
    - optional-operators
`);

  const [maxUnavailable, setMaxUnavailable] = React.useState('1');
  const [isMaxUnavailableOpen, setIsMaxUnavailableOpen] = React.useState(false);

  const clusterHealthColumns = ['Check', 'Status'];
  const clusterHealthRows = [
    { check: 'All nodes healthy', status: 'Pass' },
    { check: 'Storage available', status: 'Pass' },
    { check: 'Network connectivity', status: 'Pass' },
    { check: 'API server responsive', status: 'Pass' },
  ];

  const apiChangesColumns = ['API', 'Status', 'Action Required'];
  const apiChangesRows = [
    { api: 'apps/v1 Deployment', status: 'Ready', action: 'None' },
    { api: 'networking.k8s.io/v1 Ingress', status: 'Ready', action: 'None' },
    { api: 'rbac.authorization.k8s.io/v1 Role', status: 'Review', action: 'Verify permissions' },
  ];

  const operatorReadinessColumns = ['Operator', 'Status', 'Version'];
  const operatorReadinessRows = [
    { operator: 'Red Hat OpenShift Service Mesh', status: 'Ready', version: '2.4.0' },
    { operator: 'Red Hat OpenShift Logging', status: 'Ready', version: '5.8.0' },
    { operator: 'Red Hat OpenShift GitOps', status: 'Pending', version: '1.11.0' },
  ];

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(yamlContent);
  };

  const handleDownloadYaml = () => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preflight-summary.yaml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAuditPlan = () => {
    // Placeholder for export audit plan functionality
    console.log('Export audit plan');
  };

  const handleExportPreflightYaml = () => {
    handleDownloadYaml();
  };

  return (
    <>
      <PageSection hasBodyWrapper={false}>
        <Breadcrumb>
          <BreadcrumbItem to="#" onClick={() => navigate('/administration/updates')}>
            Updates
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Preflight Summary</BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
          <FlexItem>
            <Title headingLevel="h1" size="lg">
              Cluster updates - Preflight summary
            </Title>
          </FlexItem>
          <FlexItem>
            <ActionGroup>
              <Button variant="primary" onClick={() => navigate('/administration/updates/upgrade-progress')}>
                Run upgrade
              </Button>
              <Button variant="secondary" onClick={handleExportAuditPlan}>
                Export audit plan
              </Button>
            </ActionGroup>
          </FlexItem>
        </Flex>
      </PageSection>

      <PageSection hasBodyWrapper={false}>
        <Stack hasGutter>
          <StackItem>
            <Grid hasGutter>
          {/* Left Side */}
          <GridItem span={6}>
            <Stack hasGutter>
              {/* Current cluster ID */}
              <StackItem>
                <Title headingLevel="h3" size="md">Current cluster ID</Title>
                <Content>ocp-cluster-abc123-def456-ghi789</Content>
              </StackItem>

              {/* Current version and Targeted stable release side by side */}
              <StackItem>
                <Grid hasGutter>
                  <GridItem span={6}>
                    <Title headingLevel="h3" size="md">Current version</Title>
                    <Content>4.18.16</Content>
                  </GridItem>
                  <GridItem span={6}>
                    <Title headingLevel="h3" size="md">Targeted stable release</Title>
                    <Content>fast-5.00.01</Content>
                  </GridItem>
                </Grid>
              </StackItem>

              {/* Estimated duration */}
              <StackItem>
                <Title headingLevel="h3" size="md">Estimated duration</Title>
                <Content>Typical time 30-90 minutes</Content>
              </StackItem>

              {/* Upgrade sequence */}
              <StackItem>
                <Title headingLevel="h3" size="md">Upgrade sequence</Title>
                <Content>Control plane → Core operators → Workers → Optional operators</Content>
              </StackItem>

              {/* Divider */}
              <StackItem>
                <Divider />
              </StackItem>

              {/* Warning about rolling upgrades */}
              <StackItem>
                <Alert variant="warning" title="Warning: rolling upgrades going to take specified nodes offline" />
              </StackItem>

              {/* Node capacity */}
              <StackItem>
                <Title headingLevel="h3" size="md">Node capacity</Title>
                <Content>
                  Ensures the cluster can safely drain and update worker nodes during the upgrade.
                </Content>
              </StackItem>

              {/* Max Unavailable Node Configuration and Available capacity side by side */}
              <StackItem>
                <Grid hasGutter>
                  <GridItem span={6}>
                    <Flex alignItems={{ default: 'alignItemsFlexStart' }}>
                      <FlexItem>
                        <Icon status="warning" style={{ marginTop: '4px' }}>
                          <ExclamationTriangleIcon />
                        </Icon>
                      </FlexItem>
                      <FlexItem>
                        <Title headingLevel="h4" size="md">MaxUnavailable Node Configuration</Title>
                        <Stack hasGutter style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                          <StackItem>
                            <Content>
                              <strong>Current setting:</strong>
                            </Content>
                            <div style={{ marginTop: '4px' }}>
                              <Select
                                toggle={(toggleRef) => (
                                  <MenuToggle
                                    ref={toggleRef}
                                    onClick={() => setIsMaxUnavailableOpen(!isMaxUnavailableOpen)}
                                    isExpanded={isMaxUnavailableOpen}
                                    variant="default"
                                  >
                                    {maxUnavailable}
                                  </MenuToggle>
                                )}
                                isOpen={isMaxUnavailableOpen}
                                onOpenChange={(isOpen: boolean) => setIsMaxUnavailableOpen(isOpen)}
                                selected={maxUnavailable}
                                onSelect={(_, value) => {
                                  setMaxUnavailable(value as string);
                                  setIsMaxUnavailableOpen(false);
                                }}
                              >
                                <SelectOption value="1">1</SelectOption>
                                <SelectOption value="2">2</SelectOption>
                                <SelectOption value="3">3</SelectOption>
                                <SelectOption value="4">4</SelectOption>
                                <SelectOption value="5">5</SelectOption>
                              </Select>
                            </div>
                          </StackItem>
                          <StackItem>
                            <Content>
                              <strong>Recommended: 5</strong>
                            </Content>
                          </StackItem>
                          <StackItem>
                            <Content style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                              Allowing more nodes to be updated at once speeds up the upgrade, as long as your workloads can handle it.
                            </Content>
                          </StackItem>
                        </Stack>
                      </FlexItem>
                    </Flex>
                  </GridItem>
                  <GridItem span={6}>
                    <Flex alignItems={{ default: 'alignItemsFlexStart' }}>
                      <FlexItem>
                        <Icon status="danger" style={{ marginTop: '4px' }}>
                          <ExclamationTriangleIcon />
                        </Icon>
                      </FlexItem>
                      <FlexItem>
                        <Title headingLevel="h4" size="md">Available Capacity per Worker Pool</Title>
                        <Stack hasGutter style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                          <StackItem>
                            <Content>
                              You need 1 XL node worth of free capacity per worker pool.
                            </Content>
                          </StackItem>
                          <StackItem>
                            <Content>
                              <strong>Total free capacity required: 8 nodes</strong>
                            </Content>
                          </StackItem>
                          <StackItem>
                            <Content>
                              <strong>Available capacity detected: 3 nodes</strong>
                            </Content>
                          </StackItem>
                          <StackItem>
                            <Button variant="link" isInline>
                              Scale up nodes
                            </Button>
                          </StackItem>
                        </Stack>
                      </FlexItem>
                    </Flex>
                  </GridItem>
                </Grid>
              </StackItem>

              {/* Divider */}
              <StackItem>
                <Divider />
              </StackItem>

              {/* Cluster health */}
              <StackItem>
                <Title headingLevel="h3" size="md">Cluster health</Title>
                <Content>
                  Review the health status of your cluster components before proceeding with the upgrade.
                </Content>
                <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
                  <Thead>
                    <Tr>
                      {clusterHealthColumns.map((column) => (
                        <Th key={column}>{column}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {clusterHealthRows.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.check}</Td>
                        <Td>{row.status}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </StackItem>

              {/* API changes in next upgrade */}
              <StackItem>
                <Title headingLevel="h3" size="md">API changes in next upgrade</Title>
                <Content>
                  Review API changes that will occur during the upgrade. Some APIs may require action before upgrading.
                </Content>
                <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
                  <Thead>
                    <Tr>
                      {apiChangesColumns.map((column) => (
                        <Th key={column}>{column}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {apiChangesRows.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.api}</Td>
                        <Td>{row.status}</Td>
                        <Td>{row.action}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </StackItem>

              {/* Operator readiness */}
              <StackItem>
                <Title headingLevel="h3" size="md">Operator readiness</Title>
                <Table style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
                  <Thead>
                    <Tr>
                      {operatorReadinessColumns.map((column) => (
                        <Th key={column}>{column}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {operatorReadinessRows.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.operator}</Td>
                        <Td>{row.status}</Td>
                        <Td>{row.version}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </StackItem>
            </Stack>
          </GridItem>

          {/* Right Side - YAML Editor */}
          <GridItem span={6}>
            <Stack hasGutter>
              <StackItem>
                <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Title headingLevel="h3" size="md">Preflight YAML</Title>
                  </FlexItem>
                  <FlexItem>
                    <ActionGroup>
                      <Button variant="secondary" onClick={handleCopyYaml}>
                        Copy
                      </Button>
                      <Button variant="secondary" onClick={handleDownloadYaml}>
                        Download
                      </Button>
                      <Button variant="secondary" onClick={handleExportPreflightYaml}>
                        Export
                      </Button>
                    </ActionGroup>
                  </FlexItem>
                </Flex>
              </StackItem>
              <StackItem>
                <TextArea
                  value={yamlContent}
                  onChange={(_, value) => setYamlContent(value)}
                  rows={40}
                  resizeOrientation="vertical"
                  aria-label="YAML editor"
                />
              </StackItem>
            </Stack>
          </GridItem>
        </Grid>
          </StackItem>

          {/* Export preflight yaml button at the bottom */}
          <StackItem>
            <ActionGroup>
              <Button variant="secondary" onClick={handleExportPreflightYaml}>
                Export preflight yaml
              </Button>
            </ActionGroup>
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export { PreflightSummary };

