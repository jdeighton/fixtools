import type { AtdlDocument, Parameter, Control, StrategyPanel, StrategyLayout, EditNode } from '../model'
import styles from './ParameterDetail.module.css'

export interface ParamOccurrence {
  stratName: string
  param: Parameter
  use: 'optional' | 'required'
  inRG: boolean
  isConst: boolean
  constValue?: string
}

interface Props {
  paramName: string
  fixTag: string
  occurrences: ParamOccurrence[]
  doc: AtdlDocument
  onClose: () => void
}

function findControls(layout: StrategyLayout | undefined, paramName: string): Control[] {
  if (!layout) return []
  const result: Control[] = []
  function walk(panel: StrategyPanel) {
    for (const child of panel.children) {
      if (child.kind === 'control') {
        if (child.parameterRef === paramName) result.push(child)
      } else {
        walk(child)
      }
    }
  }
  layout.panels.forEach(walk)
  return result
}

function nodeRefsParam(node: EditNode, name: string): boolean {
  if (node.kind === 'compare') return node.field === name || node.field2 === name
  if (node.kind === 'logic') return node.operands.some(o => nodeRefsParam(o, name))
  return false
}

export function ParameterDetail({ paramName, fixTag, occurrences, doc, onClose }: Props) {
  const first = occurrences[0]?.param
  const withEnums = occurrences.find(o => o.param.enumPairs.length > 0)?.param

  const controlsByStrat = doc.strategies
    .filter(s => occurrences.some(o => o.stratName === s.name))
    .map(s => ({ stratName: s.name, controls: findControls(s.layout, paramName) }))
    .filter(x => x.controls.length > 0)

  const editRefs = doc.strategies.flatMap(s =>
    s.strategyEdits
      .filter(e => nodeRefsParam(e.condition, paramName))
      .map(e => ({ stratName: s.name, errorMsg: e.errorMsg }))
  )

  if (!first) return null

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{paramName}</span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close detail">✕</button>
      </div>

      <div className={styles.body}>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Attributes</div>
          <table className={styles.attrTable}>
            <tbody>
              <tr>
                <td className={styles.attrKey}>Type</td>
                <td className={styles.attrVal}>{first.xsiType}</td>
              </tr>
              <tr>
                <td className={styles.attrKey}>FIX Tag</td>
                <td className={styles.attrVal}>{fixTag}</td>
              </tr>
              <tr>
                <td className={styles.attrKey}>Use</td>
                <td className={styles.attrVal}>{first.use}</td>
              </tr>
              {first.constValue != null && (
                <tr>
                  <td className={styles.attrKey}>Const Value</td>
                  <td className={styles.attrVal}>{first.constValue}</td>
                </tr>
              )}
              {first.minValue != null && (
                <tr>
                  <td className={styles.attrKey}>Min Value</td>
                  <td className={styles.attrVal}>{first.minValue}</td>
                </tr>
              )}
              {first.maxValue != null && (
                <tr>
                  <td className={styles.attrKey}>Max Value</td>
                  <td className={styles.attrVal}>{first.maxValue}</td>
                </tr>
              )}
              {first.minLength != null && (
                <tr>
                  <td className={styles.attrKey}>Min Length</td>
                  <td className={styles.attrVal}>{first.minLength}</td>
                </tr>
              )}
              {first.maxLength != null && (
                <tr>
                  <td className={styles.attrKey}>Max Length</td>
                  <td className={styles.attrVal}>{first.maxLength}</td>
                </tr>
              )}
              {first.precision != null && (
                <tr>
                  <td className={styles.attrKey}>Precision</td>
                  <td className={styles.attrVal}>{first.precision}</td>
                </tr>
              )}
              {first.scope && (
                <tr>
                  <td className={styles.attrKey}>Scope</td>
                  <td className={styles.attrVal}>{first.scope}</td>
                </tr>
              )}
              <tr>
                <td className={styles.attrKey}>Mutable on C&R</td>
                <td className={styles.attrVal}>{first.mutableOnCxlRpl ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className={styles.attrKey}>Revert on C&R</td>
                <td className={styles.attrVal}>{first.revertOnCxlRpl ? 'Yes' : 'No'}</td>
              </tr>
              {first.definedByFIX && (
                <tr>
                  <td className={styles.attrKey}>Defined by FIX</td>
                  <td className={styles.attrVal}>Yes</td>
                </tr>
              )}
              {first.description && (
                <tr>
                  <td className={styles.attrKey}>Description</td>
                  <td className={styles.attrVal}>{first.description}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Occurrences ({occurrences.length})</div>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Strategy</th>
                <th>Use</th>
                <th>Const</th>
                <th>RG</th>
              </tr>
            </thead>
            <tbody>
              {occurrences.map(o => (
                <tr key={o.stratName}>
                  <td>{o.stratName}</td>
                  <td>{o.use === 'required' ? 'R' : 'O'}</td>
                  <td>{o.isConst ? (o.constValue ?? '✓') : '—'}</td>
                  <td>{o.inRG ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {withEnums && withEnums.enumPairs.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Enum Pairs ({withEnums.enumPairs.length})</div>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Wire</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {withEnums.enumPairs.map(ep => (
                  <tr key={ep.enumID}>
                    <td>{ep.enumID}</td>
                    <td>{ep.wireValue}</td>
                    <td>{ep.description ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Bound Controls</div>
          {controlsByStrat.length === 0 ? (
            <p className={styles.emptyNote}>No controls bound to this parameter</p>
          ) : (
            controlsByStrat.map(({ stratName, controls }) => (
              <div key={stratName}>
                <div className={styles.stratLabel}>{stratName}</div>
                {controls.map(c => (
                  <div key={c.id} className={styles.controlItem}>
                    <span className={styles.controlId}>{c.id}</span>{' '}
                    <span className={styles.controlType}>{c.xsiType}</span>
                    {c.label && <span className={styles.controlLabel}> — {c.label}</span>}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Strategy Edits</div>
          {editRefs.length === 0 ? (
            <p className={styles.emptyNote}>No strategy edits reference this parameter</p>
          ) : (
            editRefs.map((e, i) => (
              <div key={i} className={styles.editItem}>
                <div className={styles.stratLabel}>{e.stratName}</div>
                <span className={styles.editMsg}>"{e.errorMsg}"</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
